#!/usr/bin/env node

import { clear } from "console";
import chalk = require("chalk");
import minimist = require("minimist");
import Files from "./lib/files";
import Stemmer from "./lib/stemmer";

clear();

const run = () => {
  try {
    const stemmer: Stemmer = new Stemmer;
    
    // load basewords and stopwords file
    const myFile: Files = new Files(stemmer);
    stemmer.baseWords = myFile.readWordsFile('base');
    stemmer.stopWords = myFile.readWordsFile('stop');
    
    const args = minimist(process.argv.slice(2));
    if (args._[0] == undefined) {
      throw 401;
    }
    const words = args._[0];

    // TODO: is file? then should stem file and save the result on other file
    if (args.verbose) {
      stemmer.verbose = true;
    }

    console.log(chalk.whiteBright.bold(words));

    // let stem the word
    stemmer.input = words;
    // ngram
    stemmer.withNgram = true;
    const result = stemmer.stemWords();
    
    // verbose mode
    if (args.verbose) {
      stemmer.fullLogs.forEach((m: string[], i: number) => {
        if (i > 0) {
          console.log(chalk.blueBright('------------------------------------'));
        }
        m.forEach((v: string) => {
          console.log(chalk.blueBright(v));
        });
      });
    }

    // only show if success
    if (stemmer.isSuccess) {
      console.log(chalk.green.bold(result));
    }
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