#!/usr/bin/env node

import { clear } from "console";
import * as chalk from 'chalk';
import Files from "./lib/files";

clear();

const run = async() => {
  try {
    // check the existance of file basewords.txt
    const myFile: Files = new Files;
    const any = await myFile.isBaseWordFileExists();
    

  } catch(err) {
    if (err) {
      switch (err) {
        case 404:
          console.log(chalk.red('ERROR: Baseword file doesnt exists! Double check your installation')); break;
        default:
          console.log(chalk.red(`ERROR: ${err}`));
      }
      process.exit();
    }
  }
};
run();