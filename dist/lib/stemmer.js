"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules_1 = require("./rules");
const ngram_1 = require("./ngram");
class Stemmer {
    constructor() {
        /**
         * mode whether log process or not. when it set true
         * the messages will be saved in _logs variabel
         * Default value is false
         *
         * @private
         * @type {boolean}
         * @memberof Stemmer
         */
        this._verbose = false;
        this._logs = [];
        /**
         * RAW INPUT word(s) to be stemmed
         * The setter will also do normalizing process on input
         *
         * @private
         * @type {string}
         * @memberof Stemmer
         */
        this._input = '';
        /**
         * Status whether stemmer can found baseword or not
         * true if success and false (default) if not
         *
         * @private
         * @type {boolean}
         * @memberof Stemmer
         */
        this._success = false;
        /**
         * Whether use N-gram or not. This N-gram will only used when rule-based
         * stemming fail
         *
         * @private
         * @type {boolean}
         * @memberof Stemmer
         */
        this._withNgram = false;
        this._ngGramThreshold = 0.66;
        /**
         * Array of tokens to be stemmed
         *
         * @private
         * @type {string[]}
         * @memberof Stemmer
         */
        this._words = [];
        this._results = [];
        this.originalWord = '';
        this.ruleIndex = -1;
        /**
         * Array containing processing words and its variances
         * This will be empty on first word stemming process
         *
         * @private
         * @type {string[]}
         * @memberof Stemmer
         */
        this.currentWords = [];
        /**
         * list of basewords to check in
         *
         * it consists of getter, setter and checker of array
         *
         * @private
         * @type {string[]}
         * @memberof Stemmer
         */
        this._baseWords = [];
        /**
         * list of stopword to check in
         *
         * it consists of getter, setter and checker of array
         *
         * @private
         * @type {string[]}
         * @memberof Stemmer
         */
        this._stopWords = [];
    }
    set verbose(val) {
        this._verbose = val;
    }
    get logs() {
        return this._logs;
    }
    addLog(log) {
        if (this._verbose) {
            this._logs.push(log);
        }
    }
    set input(val) {
        if (val.length > 0) {
            this._input = val;
        }
        else {
            throw 401;
        }
    }
    get input() {
        return this._input;
    }
    get isSuccess() {
        return this._success;
    }
    set withNgram(mode) {
        this._withNgram = mode;
    }
    set ngGramThreshold(threshold) {
        this._ngGramThreshold = threshold;
    }
    get processingWords() {
        return this.currentWords;
    }
    /**
     * Function for stem each word that already tokenized and normalized
     * The word was also pass the stopwords filter
     *
     * @private
     * @param {string} word
     * @returns {string}
     * @memberof Stemmer
     */
    stemWord(word) {
        this.originalWord = word;
        this.currentWords = [word];
        this.ruleIndex = 0;
        // cek awal apakah ada di kata dasar
        if (this.inBaseWords(word)) {
            this._success = true;
            this.addLog(`🌟🌟 Menemukan kata "${word}" untuk kata "${word}" di kata dasar 🌟🌟`);
            return word;
        }
        while (true) {
            // apply rule pada setiap word di currentWords
            const rule = rules_1.default[this.ruleIndex];
            // cacah setiap kata di currentWords
            let recheckCurrentWords = false;
            for (let k = 0; k < this.currentWords.length; k++) {
                const w = this.currentWords[k];
                // hanya jika di test bernilai true
                if (rule.pattern.test(w)) {
                    this.addLog(`🕓 Menjalankan rule ${rule.name} pada kata "${w}" 🕓`);
                    if (!rule.hasVariance) {
                        const morph = w.replace(rule.pattern, rule.replacement);
                        this.addLog(`⇨ Mengubah kata "${w}" menjadi: "${morph}"`);
                        if (this.inBaseWords(morph)) {
                            // ada di kata dasar
                            this._success = true;
                            this.addLog(`🌟🌟 Menemukan kata "${morph}" untuk kata "${word}" di kata dasar 🌟🌟`);
                            return morph;
                        }
                        else {
                            // masih tidak ditemukan di kata dasar
                            if (rule.recover) {
                                // kembalikan ke kata sebelum diproses
                                this.addLog(`⇨ Mengembalikan kata "${morph}" ke "${w}"`);
                                this.currentWords[k] = w;
                                // jika recover both maka yang dibuang juga dimasukkan
                                if (rule.recover == 'both') {
                                    this.currentWords.push(morph);
                                }
                            }
                            else {
                                // gunakan kata yang baru
                                this.currentWords[k] = morph;
                            }
                        }
                    }
                    else {
                        /**
                         * menghasilkan beberapa variasi kata,
                         * jika masih tidak ketemu di kata dasar, array di current_word di splice, dan
                         * kata yang sekarang diganti dengan kata yang baru
                         */
                        const morphs = [];
                        for (let i = 0; i < rule.replacements.length; i++) {
                            const r = rule.replacements[i];
                            const morph = w.replace(rule.pattern, r);
                            this.addLog(`⇨ Mengubah kata "${w}" menjadi: "${morph}"`);
                            if (this.inBaseWords(morph)) {
                                // ada di kata dasar
                                this._success = true;
                                this.addLog(`🌟🌟 Menemukan kata "${morph}" untuk kata "${word}" di kata dasar 🌟🌟`);
                                return morph;
                            }
                            morphs.push(morph);
                        }
                        this.currentWords.splice(k, 1);
                        this.currentWords = [...this.currentWords, ...morphs];
                        recheckCurrentWords = true;
                        // break for iteration
                        break;
                    }
                }
            }
            if (!recheckCurrentWords) {
                this.ruleIndex += 1;
            }
            // break jika rule sudah habis
            if (this.ruleIndex == rules_1.default.length) {
                break;
            }
        }
        // coba temukan dengan n-gram hanya jika withNgram diset true
        if (this._withNgram) {
            for (let i = 0; i < this._baseWords.length; i++) {
                const baseWord = this._baseWords[i];
                const nGram = new ngram_1.default(baseWord, word);
                const value = nGram.calculate();
                if (value >= this._ngGramThreshold) {
                    this._success = true;
                    this.addLog(`🌟🌟 Menemukan kata "${baseWord}" untuk kata "${word}" di kata dasar 🌟🌟`);
                    return baseWord;
                }
            }
        }
        this.addLog(`⚠ Tidak dapat menemukan kata "${word}" di kata dasar`);
        return this.originalWord;
    }
    /**
     * main function to fire the stemming process
     * this will read tokens in _words and the return the result
     * basewords and stopwords should called before calling this
     * method since this method assume that baseword and stopwords
     * are already determined
     *
     * @returns {string}
     * @memberof Stemmer
     */
    stemWords() {
        const splitChar = ' ';
        // tokenizing into tokens
        this._words = this._input.split(splitChar);
        this.addLog(`✔ Tokenisasi ${this._input} menjadi: [${this._words.join(', ')}]`);
        // copy array input to result since we will only modify
        // the result rather than the input
        this._results = [...this._words];
        // normalized, casefolding
        this._results = this._results.map(word => this.normalizeString(word));
        this.addLog(`✔ Casefolding [${this._words.join(', ')}] menjadi: [${this._results.join(', ')}]`);
        // stopword removal and remove word with length below 3 character
        this._results = this._results.filter(v => !this.inStopWords(v) && v.length > 3);
        this.addLog(`✔ Membuang stopwords menjadi: [${this._results.join(', ')}]`);
        if (this._results.length > 0) {
            // process each word
            this._results = this._results.map(word => this.stemWord(word));
            return this._results.join(splitChar);
        }
        return '';
    }
    /**
     * casefolding and normalize text to remove accents diacritics
     *
     * https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
     *
     * @param {string} text
     * @returns {string}
     * @memberof Stemmer
     */
    normalizeString(text) {
        return text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z\-']/g, "");
    }
    set baseWords(words) {
        this._baseWords = words;
    }
    get baseWords() {
        return this._baseWords;
    }
    inBaseWords(word) {
        return this._baseWords.indexOf(word) > -1;
    }
    set stopWords(words) {
        this._stopWords = words;
    }
    get stopWords() {
        return this._stopWords;
    }
    inStopWords(word) {
        return this._stopWords.indexOf(word) > -1;
    }
}
exports.default = Stemmer;
