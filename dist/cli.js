#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const chalk = require("chalk");
const minimist = require("minimist");
const files_1 = require("./lib/files");
const stemmer_1 = require("./lib/stemmer");
console_1.clear();
const run = () => {
    try {
        const stemmer = new stemmer_1.default;
        // load basewords and stopwords file
        const myFile = new files_1.default(stemmer);
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
            stemmer.fullLogs.forEach((m, i) => {
                if (i > 0) {
                    console.log(chalk.blueBright('------------------------------------'));
                }
                m.forEach((v) => {
                    console.log(chalk.blueBright(v));
                });
            });
        }
        // only show if success
        if (stemmer.isSuccess) {
            console.log(chalk.green.bold(result));
        }
    }
    catch (err) {
        if (err) {
            switch (err) {
                case 401:
                    console.log(chalk.red('ERROR: Nothing to check! Please supply word(s) to check'));
                    break;
                case 404:
                    console.log(chalk.red('ERROR: Either baseword/stopword file doesnt exists! Double check your installation'));
                    break;
                default:
                    console.log(chalk.red(`ERROR: ${err}`));
            }
            process.exit();
        }
    }
};
run();
