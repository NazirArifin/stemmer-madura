import Stemmer from './stemmer';
declare class Files {
    /**
     * Name of baseword file containing base word
     * Default value is "basewords.txt"
     *
     * @private
     * @type {string}
     * @memberof Files
     */
    private _baseWords;
    set baseWords(val: string);
    /**
     * Name of stopword file containing stop words
     * Default value is "stopwords.txt";
     *
     * @private
     * @type {string}
     * @memberof Files
     */
    private _stopWords;
    set stopWords(val: string);
    /**
     * Object of stemmer for normalizing text in file
     *
     * @private
     * @type {Stemmer}
     * @memberof Files
     */
    private _stemmer;
    constructor(stemmer: Stemmer);
    /**
     * Read baseword and stopword syncronously and then split into array
     *
     * @param {('base'|'stop')} type
     * @returns {string[]}
     * @memberof Files
     */
    readWordsFile(type: 'base' | 'stop'): string[];
    /**
     * Split content of file by line break
     *
     * @private
     * @param {string} content
     * @returns {string[]}
     * @memberof Files
     */
    private splitWordsFile;
    /**
     * DEPRECATED
     * Check whether text file containing base words is exists
     *
     * First, we search on current working directory
     * If fail the try to find in node_modules/stemmer-madura
     *
     * @deprecated
     * @param {('base'|'stop')} type
     * @returns {Promise<string[]>}
     * @memberof Files
     */
    isWordsFileExists(type: 'base' | 'stop'): Promise<string[]>;
    /**
     * DEPRECATED
     * read file syncronously and then split into array
     *
     * @deprecated
     * @private
     * @param {string} file
     * @returns {string[]}
     * @memberof Files
     */
    private readSplitFile;
    /**
     * get line of break character for splitting text
     *
     * https://stackoverflow.com/questions/34820267/detecting-type-of-line-breaks
     *
     * @private
     * @param {string} text
     * @returns {string}
     * @memberof Files
     */
    private getLineBreakChar;
}
export default Files;
