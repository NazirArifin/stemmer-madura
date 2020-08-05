export default class NGram {
    private _firstWord;
    private _secondWord;
    private _gram;
    set firstWord(word: string);
    set secondWord(word: string);
    set n(gram: number);
    get firstWord(): string;
    get secondWord(): string;
    constructor(firstWord: string, secondWord: string, n?: number);
    private firstGrams;
    private secondGrams;
    /**
     * Dice Coefficient of Two Comparing Words
     * 2 (c) / a + b
     */
    calculate(): number;
    private generateGrams;
}
