import rules from './rules';

class Stemmer {
  /**
   * mode whether log process or not. when it set true
   * the messages will be saved in _logs variabel
   * Default value is false
   *
   * @private
   * @type {boolean}
   * @memberof Stemmer
   */
  private _verbose: boolean = false;
  set verbose(val: boolean) {
    this._verbose = val;
  }
  private _logs: string[] = [];
  get logs(): string[] {
    return this._logs;
  }
  private addLog(log: string): void {
    if (this._verbose) {
      this._logs.push(log);
    }
  }

  /**
   * RAW INPUT word(s) to be stemmed
   * The setter will also do normalizing process on input
   *
   * @private
   * @type {string}
   * @memberof Stemmer
   */
  private _input: string = '';
  set input(val: string) {
    if (val.length > 0) {
      this._input = val;
    } else {
      throw 401;
    }
  }
  get input(): string {
    return this._input;
  }

  /**
   * Array of tokens to be stemmed
   *
   * @private
   * @type {string[]}
   * @memberof Stemmer
   */
  private _words: string[] = [];
  private _results: string[] = [];

  private originalWord: string = '';
  private ruleIndex: number = -1;
  private currentWords: string[] = [];

  // /**
  //  * Array containing word variance as a result of modification and removal
  //  *
  //  * @private
  //  * @type {string[]}
  //  * @memberof Stemmer
  //  */
  // private _morphWords: string[] = [];
  // get morphWords(): string[] {
  //   return this._morphWords;
  // }

  /**
   * Function for stem each word that already tokenized and normalized
   * The word was also pass the stopwords filter
   *
   * @private
   * @param {string} word
   * @returns {string}
   * @memberof Stemmer
   */
  private stemWord(word: string): string {
    this.originalWord = word;
    this.currentWords = [word];
    this.ruleIndex = 0;

    // cek awal apakah ada di kata dasar
    if (this.inBaseWords(word)) {
      this.addLog(`Menemukan kata "${word}" untuk kata "${word}" di kata dasar`);
      return word;
    }

    while(true) {
      // apply rule pada setiap word di currentWords
      const rule = rules[this.ruleIndex];

      // cacah setiap kata di currentWords
      let recheckCurrentWords: boolean = false;
      for (let k = 0; k < this.currentWords.length; k++) {
        const w = this.currentWords[k];

        // hanya jika di test bernilai true
        if (rule.pattern.test(w)) {
          this.addLog(`🕓 Menjalankan rule ${rule.name} pada kata "${w}" 🕓`);

          if ( ! rule.hasVariance) {
            const morph = w.replace(rule.pattern, rule.replacement);
            this.addLog(`⇨ Mengubah kata "${w}" menjadi: "${morph}"`);
            
            if (this.inBaseWords(morph)) {
              // ada di kata dasar
              this.addLog(`🌟🌟 Menemukan kata "${morph}" untuk kata "${word}" di kata dasar 🌟🌟`);
              return morph;
            } else {
              // masih tidak ditemukan di kata dasar
              if (rule.recover) {
                // kembalikan ke kata sebelum diproses
                this.addLog(`⇨ Mengembalikan kata "${morph}" ke "${w}"`);
                this.currentWords[k] = w;
                // jika recover both maka yang dibuang juga dimasukkan
                if (rule.recover == 'both') {
                  this.currentWords.push(morph);
                }
              } else {
                // gunakan kata yang baru
                this.currentWords[k] = morph;
              }
            }
          } else {
            /**
             * menghasilkan beberapa variance kata, 
             * jika masih tidak ketemu di kata dasar, array di current_word di splice, dan 
             * kata yang sekarang diganti dengan kata yang baru
             */
            const morphs: string[] = [];
            for (let i = 0; i < rule.replacements.length; i++) {
              const r = rule.replacements[i];
              const morph = w.replace(rule.pattern, r);

              this.addLog(`⇨ Mengubah kata "${w}" menjadi: "${morph}"`);
              if (this.inBaseWords(morph)) {
                // ada di kata dasar
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
      
      if ( ! recheckCurrentWords) {
        this.ruleIndex += 1;
      }
      // break jika rule sudah habis
      if (this.ruleIndex == rules.length) {
        break;
      }
    }

    // console.log(this.currentWords.join(', '));
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
  public stemWords(): string {
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
    this._results.filter(v => ! this.inStopWords(v) && v.length > 3);
    this.addLog(`✔ Membuang stopwords menjadi: [${this._results.join(', ')}]`);

    // process each word
    this._results = this._results.map(word => this.stemWord(word));
    
    return this._results.join(splitChar);
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
  public normalizeString(text: string): string {
    return text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z\-']/g, "");
  }

  /**
   * list of basewords to check in
   * 
   * it consists of getter, setter and checker of array
   *
   * @private
   * @type {string[]}
   * @memberof Stemmer
   */
  private _baseWords: string[] = [];
  set baseWords(words: string[]) {
    this._baseWords = words;
  }
  get baseWords(): string[] {
    return this._baseWords;
  }
  private inBaseWords(word: string): boolean {
    return this._baseWords.indexOf(word) > -1;
  }

  /**
   * list of stopword to check in
   * 
   * it consists of getter, setter and checker of array
   *
   * @private
   * @type {string[]}
   * @memberof Stemmer
   */
  private _stopWords: string[] = [];
  set stopWords(words: string[]) {
    this._stopWords = words;
  }
  get stopWords(): string[] {
    return this._stopWords;
  }
  private inStopWords(word: string): boolean {
    return this._stopWords.indexOf(word) > -1;
  }
}

export default Stemmer;