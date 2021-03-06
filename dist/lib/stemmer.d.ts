declare class Stemmer {
    /**
     * mode whether log process or not. when it set true
     * the messages will be saved in _logs variabel. Default value is false
     *
     * @private
     * @type {boolean}
     * @memberof Stemmer
     */
    private _verbose;
    set verbose(val: boolean);
    /**
     * Variabel containing logs for last stemming process
     *
     * @private
     * @type {string[]}
     * @memberof Stemmer
     */
    private _logs;
    private addLog;
    /**
     * Variabel containing all logs. This will be filled when stemming process of word
     * started. This variable is used for multiple words input since _logs only save
     * log for last stemming process
     *
     * @private
     * @type {string[][]}
     * @memberof Stemmer
     */
    private _fullLogs;
    get fullLogs(): string[][];
    private dumpLogs;
    /**
     * RAW INPUT word(s) to be stemmed
     * The setter will also do normalizing process on input
     *
     * @private
     * @type {string}
     * @memberof Stemmer
     */
    private _input;
    set input(val: string);
    get input(): string;
    /**
     * Status whether stemmer can found baseword or not
     * true if success and false (default) if not
     *
     * @private
     * @type {boolean}
     * @memberof Stemmer
     */
    private _success;
    get isSuccess(): boolean;
    /**
     * Whether use N-gram or not. This N-gram will only used when rule-based
     * stemming fail
     *
     * @private
     * @type {boolean}
     * @memberof Stemmer
     */
    private _withNgram;
    set withNgram(mode: boolean);
    private _ngGramThreshold;
    set ngGramThreshold(threshold: number);
    /**
     * Array of tokens to be stemmed
     *
     * @private
     * @type {string[]}
     * @memberof Stemmer
     */
    private _words;
    private _results;
    private originalWord;
    private ruleIndex;
    /**
     * Array containing processing words and its variances
     * This will be empty on first word stemming process
     *
     * @private
     * @type {string[]}
     * @memberof Stemmer
     */
    private currentWords;
    get processingWords(): string[];
    /**
     * Function for stem each word that already tokenized and normalized
     * The word was also pass the stopwords filter
     *
     * @private
     * @param {string} word
     * @returns {string}
     * @memberof Stemmer
     */
    private stemWord;
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
    stemWords(): string;
    /**
     * casefolding and normalize text to remove accents diacritics
     *
     * https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
     *
     * @param {string} text
     * @returns {string}
     * @memberof Stemmer
     */
    normalizeString(text: string): string;
    /**
     * list of basewords to check in
     *
     * it consists of getter, setter and checker of array
     *
     * @private
     * @type {string[]}
     * @memberof Stemmer
     */
    private _baseWords;
    set baseWords(words: string[]);
    get baseWords(): string[];
    private inBaseWords;
    /**
     * list of stopword to check in
     *
     * it consists of getter, setter and checker of array
     *
     * @private
     * @type {string[]}
     * @memberof Stemmer
     */
    private _stopWords;
    set stopWords(words: string[]);
    get stopWords(): string[];
    private inStopWords;
}
export default Stemmer;
