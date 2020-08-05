export default class NGram {
  private _firstWord: string;
  private _secondWord: string;
  private _gram: number;

  set firstWord(word: string) {
    this._firstWord = word;
  }
  set secondWord(word: string) {
    this._secondWord = word;
  }
  set n(gram: number) {
    this._gram = gram;
  }

  get firstWord(): string {
    return this._firstWord;
  }
  get secondWord(): string {
    return this._secondWord;
  }

  public constructor(firstWord: string, secondWord: string, n: number = 2) {
    this._firstWord = firstWord;
    this._secondWord = secondWord;
    this._gram = n;
  }

  private firstGrams: string[] = [];
  private secondGrams: string[] = [];

  /**
   * Dice Coefficient of Two Comparing Words
   * 2 (c) / a + b
   */
  public calculate(): number {
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

  private generateGrams(word: string): string[] {
    const r: string[] = [];
    for (let i = 0; i < word.length - 1; i++) {
      const e = word.substr(i, this._gram);
      r.push(e);  
    }
    return r;
  }
}