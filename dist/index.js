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
const files_1 = require("./lib/files");
console_1.clear();
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check the existance of file basewords.txt
        const myFile = new files_1.default;
        const any = yield myFile.isBaseWordFileExists();
    }
    catch (err) {
        if (err) {
            switch (err) {
                case 404:
                    console.log(chalk.red('ERROR: Baseword file doesnt exists! Double check your installation'));
                    break;
                default:
                    console.log(chalk.red(`ERROR: ${err}`));
            }
            process.exit();
        }
    }
});
run();
