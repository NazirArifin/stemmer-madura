#!/usr/bin/env node

import { clear } from "console";
import chalk = require("chalk");
import minimist = require("minimist");
import Files from "./lib/files";
import Stemmer from "./lib/stemmer";

clear();

const run = async() => {
  try {
    const stemmer: Stemmer = new Stemmer;
    
    // check the existance of file basewords.txt
    const myFile: Files = new Files(stemmer);
    stemmer.baseWords = await myFile.isWordsFileExists('base');

    // check the existance of file stopwords.txt
    stemmer.stopWords = await myFile.isWordsFileExists('stop');
    
    const args = minimist(process.argv.slice(2));
    if (args._[0] == undefined) {
      throw 401;
    }
    const words = args._[0];

    // TODO: -v for verbose mode (show all processes)
    // TODO: is file? then should stem file and save the result on other file

    // let stem the word
    stemmer.input = words;
    const result = stemmer.stemWords();
    console.log(chalk.green(result));
  } catch(err) {
    if (err) {
      switch (err) {
        case 401:
          console.log(chalk.red('ERROR: Nothing to check! Please supply word(s) to check')); break;
        case 404:
          console.log(chalk.red('ERROR: Either baseword/stopword file doesnt exists! Double check your installation')); break;
        default:
          console.log(chalk.red(`ERROR: ${err}`));
      }
      process.exit();
    }
  }
};
run();