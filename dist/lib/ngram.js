"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NGram {
    constructor(firstWord, secondWord, n = 2) {
        this.firstGrams = [];
        this.secondGrams = [];
        this._firstWord = firstWord;
        this._secondWord = secondWord;
        this._gram = n;
    }
    set firstWord(word) {
        this._firstWord = word;
    }
    set secondWord(word) {
        this._secondWord = word;
    }
    set n(gram) {
        this._gram = gram;
    }
    get firstWord() {
        return this._firstWord;
    }
    get secondWord() {
        return this._secondWord;
    }
    /**
     * Dice Coefficient of Two Comparing Words
     * 2 (c) / a + b
     */
    calculate() {
        this.firstGrams = this.generateGrams(`*${this._firstWord}*`);
        this.secondGrams = this.generateGrams(`*${this._secondWord}*`);
        let shared = 0;
        for (let i = 0; i < this.firstGrams.length; i++) {
            const fg = this.firstGrams[i];
            for (let j = 0; j < this.secondGrams.length; j++) {
                const sg = this.secondGrams[j];
                if (fg == sg) {
                    shared += 1;
                }
            }
        }
        return parseFloat(((2 * shared) / (this.firstGrams.length + this.secondGrams.length)).toFixed(3));
    }
    generateGrams(word) {
        const r = [];
        for (let i = 0; i < word.length - 1; i++) {
            const e = word.substr(i, this._gram);
            r.push(e);
        }
        return r;
    }
}
exports.default = NGram;
