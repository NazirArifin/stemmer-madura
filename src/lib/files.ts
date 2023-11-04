import * as fs from 'fs';
import * as path from 'path';
import chalk = require('chalk');
import Stemmer from './stemmer';

class Files {
  /**
   * Name of baseword file containing base word
   * Default value is "basewords.txt"
   *
   * @private
   * @type {string}
   * @memberof Files
   */
  private _baseWords: string = 'basewords.txt';
  public set baseWords(val: string) {
    this._baseWords = val;
  }

  /**
   * Name of stopword file containing stop words
   * Default value is "stopwords.txt";
   *
   * @private
   * @type {string}
   * @memberof Files
   */
  private _stopWords: string = 'stopwords.txt';
  public set stopWords(val: string) {
    this._stopWords = val;
  }

  /**
   * Object of stemmer for normalizing text in file
   *
   * @private
   * @type {Stemmer}
   * @memberof Files
   */
  private _stemmer: Stemmer;
  constructor(stemmer: Stemmer) {
    this._stemmer = stemmer;
  }

  /**
   * Read baseword and stopword syncronously and then split into array
   *
   * @param {('base'|'stop')} type
   * @returns {string[]}
   * @memberof Files
   */
  public readWordsFile(type: 'base'|'stop'): string[] {
    const cwd: string = process.cwd();
    const fwords: string = type == 'base' ? this._baseWords : this._stopWords;
    let file: string = path.join(cwd, fwords);

    try {
      let data = fs.readFileSync(file, { encoding: 'utf-8' });
      if (data) {
        return this.splitWordsFile(data);
      }
    } catch (err) {
      // Handle the error for the first attempt, if needed
      // console.error('Error during the first attempt:', err);
    }
    
    // Attempt the second `fs.readFileSync` call outside the first catch block
    file = path.join(cwd, 'node_modules', 'stemmer-madura', fwords);
    try {
      let data = fs.readFileSync(file, { encoding: 'utf-8' });
      if (data) {
        return this.splitWordsFile(data);
      }
    } catch (err2) {
      // Handle the error for the second attempt, if needed
      // console.error('Error during the second attempt:', err2);
    }
    
    return [];
  }

  /**
   * Split content of file by line break
   *
   * @private
   * @param {string} content
   * @returns {string[]}
   * @memberof Files
   */
  private splitWordsFile(content: string): string[] {
    const lf = this.getLineBreakChar(content);
    return content.split(lf).filter(e => e.length > 0).map(v => this._stemmer.normalizeString(v));
  }

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
  public isWordsFileExists(type: 'base'|'stop'): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      const cwd: string = process.cwd();
      const fwords: string = type == 'base' ? this._baseWords : this._stopWords;
      let file: string = path.join(cwd, fwords);
      fs.access(file, fs.constants.F_OK, err => {
        if ( ! err) {
          resolve(this.readSplitFile(file));
        } else {
          file = path.join(cwd, 'node_modules', 'stemmer-madura', fwords);
          fs.access(file, fs.constants.F_OK, err => {
            if ( ! err) {
              resolve(this.readSplitFile(file));
            } else {
              // NOT FOUND :)
              reject(404);
            }
          });
        }
      });
    });
  }

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
  private readSplitFile(file: string): string[] {
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
  private getLineBreakChar(text: string): string {
    const indexOfLF = text.indexOf('\n', 1);  // No need to check first-character
    if (indexOfLF === -1) {
      if (text.indexOf('\r') !== -1) return '\r';
      return '\n';
    }
    if (text[indexOfLF - 1] === '\r') return '\r\n';
    return '\n';
  }
}
export default Files;