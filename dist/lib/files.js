"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Files {
    constructor(stemmer) {
        /**
         * Name of baseword file containing base word
         * Default value is "basewords.txt"
         *
         * @private
         * @type {string}
         * @memberof Files
         */
        this._baseWords = 'basewords.txt';
        /**
         * Name of stopword file containing stop words
         * Default value is "stopwords.txt";
         *
         * @private
         * @type {string}
         * @memberof Files
         */
        this._stopWords = 'stopwords.txt';
        this._stemmer = stemmer;
    }
    set baseWords(val) {
        this._baseWords = val;
    }
    set stopWords(val) {
        this._stopWords = val;
    }
    /**
     * Check whether text file containing base words is exists
     *
     * First, we search on current working directory
     * If fail the try to find in node_modules/stemmer-madura
     *
     * @param {('base'|'stop')} type
     * @returns {Promise<string[]>}
     * @memberof Files
     */
    isWordsFileExists(type) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const cwd = process.cwd();
            const fwords = type == 'base' ? this._baseWords : this._stopWords;
            let file = path.join(cwd, fwords);
            fs.access(file, fs.constants.F_OK, err => {
                if (!err) {
                    resolve(this.readSplitFile(file));
                }
                else {
                    file = path.join(cwd, 'node_modules', 'stemmer-madura', fwords);
                    fs.access(file, fs.constants.F_OK, err => {
                        if (!err) {
                            resolve(this.readSplitFile(file));
                        }
                        else {
                            // NOT FOUND :)
                            reject(404);
                        }
                    });
                }
            });
        }));
    }
    /**
     * read file syncronously and then split into array
     *
     * @private
     * @param {string} file
     * @returns {string[]}
     * @memberof Files
     */
    readSplitFile(file) {
        const data = fs.readFileSync(file, { encoding: 'utf-8' });
        const lf = this.getLineBreakChar(data);
        return data.split(lf).filter(e => e.length > 0).map(v => this._stemmer.normalizeString(v));
    }
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
    getLineBreakChar(text) {
        const indexOfLF = text.indexOf('\n', 1); // No need to check first-character
        if (indexOfLF === -1) {
            if (text.indexOf('\r') !== -1)
                return '\r';
            return '\n';
        }
        if (text[indexOfLF - 1] === '\r')
            return '\r\n';
        return '\n';
    }
}
exports.default = Files;
