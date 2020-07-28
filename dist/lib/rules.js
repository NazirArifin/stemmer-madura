"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules = [
    // Reduplication Removal
    {
        name: 'Reduplication Removal',
        pattern: new RegExp('^.+\-(.+)$'),
        replacement: '$1', replacements: [],
        hasVariance: false
    },
    // Plain Suffix Removal 1
    {
        name: 'Plain Suffix Removal 1',
        pattern: new RegExp('^(.+)(ya|na|an|ih|eh|ah)$'),
        replacement: '$1', replacements: [],
        hasVariance: false
    },
    // Plain Suffix Removal 2
    {
        name: 'Plain Suffix Removal 2',
        pattern: new RegExp('^(.+)([ae])$'),
        replacement: '$1', replacements: [],
        hasVariance: false
    },
    // Aghi Suffix Removal
    {
        name: 'Aghi Suffix Removal',
        pattern: new RegExp('^(.+)aghi$'),
        replacement: '$1', replacements: [],
        hasVariance: false
    },
    // Plain Prefix Removal 1
    {
        name: 'Plain Prefix Removal 1',
        pattern: new RegExp('^([ae])(.+)$'),
        replacement: '$2', replacements: [],
        hasVariance: false
    },
    // Plain Prefix Removal 2
    {
        name: 'Plain Prefix Removal 2',
        pattern: new RegExp('^(ta|ma|ka|sa|pa|pe)(.+)$'),
        replacement: '$2', replacements: [],
        hasVariance: false
    },
    // Plain Prefix Removal 3
    {
        name: 'Plain Prefix Removal 3',
        pattern: new RegExp('^(par|pang|nga)([^aeuio].+)$'),
        replacement: '$2', replacements: [],
        hasVariance: true
    },
    // Ng Prefix Removal 1
    {
        name: 'Ng Prefix Removal 1',
        pattern: new RegExp('^ng([lr].+)$'),
        replacement: '$1', replacements: [],
        hasVariance: false
    },
    // Ng Prefix Modification 2
    {
        name: 'Ng Prefix Modification 2',
        pattern: new RegExp('^ng([aeio].+)$'),
        replacement: '', replacements: ['k$1', 'g$1', 'gh$1'],
        hasVariance: true
    },
    // M Prefix Modification
    {
        name: 'M Prefix Modification',
        pattern: new RegExp('^m([aeou].+)$'),
        replacement: '', replacements: ['b$1', 'p$1', 'bh$1'],
        hasVariance: true
    },
    // NY Prefix Modification
    {
        name: 'NY Prefix Modification',
        pattern: new RegExp('^ny([aeo].+)$'),
        replacement: '', replacements: ['s$1', 'c$1', 'j$1', 'jh$1'],
        hasVariance: true
    },
    // N Prefix Modification
    {
        name: 'N Prefix Modification',
        pattern: new RegExp('^n([ao].+)$'),
        replacement: '', replacements: ['t$1', 'd$1', 'dh$1'],
        hasVariance: true
    },
    // Plain Infix Removal
    {
        name: 'Plain Infix Removal',
        pattern: new RegExp('^([^aiueo]{1,2})(al|ar|en|in|om|um)(.+)$'),
        replacement: '$1$3', replacements: [],
        hasVariance: false
    }
];
exports.default = rules;
