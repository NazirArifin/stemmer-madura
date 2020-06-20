import * as fs from 'fs';
import * as path from 'path';
import chalk = require('chalk');

class Files {
  /**
   * Name of baseword file containing base word
   * 
   * Default value is "baseword.txt"
   *
   * @private
   * @type {string}
   * @memberof Files
   */
  private _baseWords: string = 'basewords.txt';

  /**
   * Setter for modifying baseword path
   *
   * @memberof Files
   */
  public set baseWords(val: string) {
    this._baseWords = val;
  }

  /**
   * Check whether text file containing base words is exists
   * 
   * First, we search on current working directory
   * If fail the try to find in node_modules/stemmer-madura/lib
   *
   * @returns {Promise<number|true>}
   * @memberof Files
   */
  public isBaseWordFileExists(): Promise<number|true> {
    return new Promise(async (resolve, reject) => {
      const cwd: string = process.cwd();
      let file: string = path.join(cwd, this._baseWords);
      fs.access(file, fs.constants.F_OK, err => {
        if ( ! err) {
          resolve(true);
        } else {
          file = path.join(cwd, 'node_modules', 'stemmer-madura', this._baseWords);
          fs.access(file, fs.constants.F_OK, err => {
            if ( ! err) {
              resolve(true);
            } else {
              reject(404);
            }
          });
        }
      });
    });
  }
}
export default Files;