#!/usr/bin/env node
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
const console_1 = require("console");
const chalk = require("chalk");
const minimist = require("minimist");
const files_1 = require("./lib/files");
const stemmer_1 = require("./lib/stemmer");
console_1.clear();
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stemmer = new stemmer_1.default;
        // check the existance of file basewords.txt
        const myFile = new files_1.default(stemmer);
        stemmer.baseWords = yield myFile.isWordsFileExists('base');
        // check the existance of file stopwords.txt
        stemmer.stopWords = yield myFile.isWordsFileExists('stop');
        const args = minimist(process.argv.slice(2));
        if (args._[0] == undefined) {
            throw 401;
        }
        const words = args._[0];
        // TODO: is file? then should stem file and save the result on other file
        if (args.verbose) {
            stemmer.verbose = true;
        }
        console.log(chalk.whiteBright.bold.underline(words));
        // let stem the word
        stemmer.input = words;
        const result = stemmer.stemWords();
        // verbose mode
        if (args.verbose) {
            stemmer.logs.forEach((v) => {
                console.log(chalk.blueBright(v));
            });
        }
        console.log(chalk.green.bold.underline(result));
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
});
run();
