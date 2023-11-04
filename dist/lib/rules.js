"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules = [
    // Reduplication Removal
    {
        name: 'Reduplication Removal',
        pattern: new RegExp('^.+\-(.+)$'),
        replacement: '$1', replacements: [],
        hasVariance: false, recover: false
    },
    // Nah Suffix Removal
    // Sepertinya tidak baku, mungkin bentuk dari akhiran "na" (romana, kalambina)
    {
        name: 'Nah Suffix Removal',
        pattern: new RegExp('^(.+)nah$'),
        replacement: '$1', replacements: [],
        hasVariance: false, recover: true
    },
    // Plain Suffix Removal 1
    {
        name: 'Plain Suffix Removal 1',
        pattern: new RegExp('^(.+)(ya|na|ni|an|ih|eh|en|ah)$'),
        replacement: '$1', replacements: [],
        hasVariance: false, recover: 'both'
    },
    // Plain Suffix Removal 2
    {
        name: 'Plain Suffix Removal 2',
        pattern: new RegExp('^(.+)([aei])$'),
        replacement: '$1', replacements: [],
        hasVariance: false, recover: 'both'
    },
    // Aghi Suffix Removal
    {
        name: 'Aghi Suffix Removal',
        pattern: new RegExp('^(.+)aghi$'),
        replacement: '$1', replacements: [],
        hasVariance: false, recover: false
    },
    // Plain Prefix Removal 1
    {
        name: 'Plain Prefix Removal 1',
        pattern: new RegExp('^([ae])(.+)$'),
        replacement: '$2', replacements: [],
        hasVariance: false, recover: false
    },
    // Plain Prefix Removal 2
    {
        name: 'Plain Prefix Removal 2',
        pattern: new RegExp('^(ta|ma|ka|sa|pa|pe)(.+)$'),
        replacement: '$2', replacements: [],
        hasVariance: false, recover: "both"
    },
    // Plain Prefix Removal 3
    {
        name: 'Plain Prefix Removal 3',
        pattern: new RegExp('^(par)([^aeuio].+)$'),
        replacement: '$2', replacements: [],
        hasVariance: false, recover: false
    },
    // Ng Prefix Removal 1
    {
        name: 'Ng Prefix Removal 1',
        pattern: new RegExp('^ng(.+)$'),
        replacement: '$1', replacements: [],
        hasVariance: false, recover: true
    },
    // Ng Prefix Modification 2
    {
        name: 'Ng Prefix Modification 2',
        pattern: new RegExp('^ng([aeio].+)$'),
        replacement: '', replacements: ['k$1', 'g$1', 'gh$1'],
        hasVariance: true, recover: false
    },
    // M Prefix Modification
    {
        name: 'M Prefix Modification',
        pattern: new RegExp('^m([aeou].+)$'),
        replacement: '', replacements: ['b$1', 'p$1', 'bh$1'],
        hasVariance: true, recover: false
    },
    // NY Prefix Modification
    {
        name: 'NY Prefix Modification',
        pattern: new RegExp('^ny([aeo].+)$'),
        replacement: '', replacements: ['s$1', 'c$1', 'j$1', 'jh$1'],
        hasVariance: true, recover: false
    },
    // N Prefix Modification
    {
        name: 'N Prefix Modification',
        pattern: new RegExp('^n([aeo].+)$'),
        replacement: '', replacements: ['t$1', 'd$1', 'dh$1'],
        hasVariance: true, recover: false
    },
    // Plain Infix Removal
    {
        name: 'Plain Infix Removal',
        pattern: new RegExp('^([^aiueo]{1,2})(al|ar|en|in|om|um)(.+)$'),
        replacement: '$1$3', replacements: [],
        hasVariance: false, recover: false
    }
];
exports.default = rules;
