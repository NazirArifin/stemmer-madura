# Stemmer Madura

[![Build Status](https://travis-ci.com/NazirArifin/stemmer-madura.svg?token=2v7QpAPuXVQmyEXNWo3j&branch=master)](https://travis-ci.com/NazirArifin/stemmer-madura)

Stemmer untuk bahasa Madura menggunakan rule-based.

### Instalasi

Stemmer-madura dapat diinstall menggunakan npm dengan perintah:

```sh
npm install stemmer-madura
```

### Penggunaan

Stemmer-madura akan mencari file kata dasar (defaultnya: __basewords.txt__) dan file kata umum (defaulnya: __stopwords.txt__) pada direktori aktif dimana perintah dijalankan. Jika file tidak ditemukan maka akan digunakan file default yang disertakan dalam package ini.

** Dalam package ini disertakan file [basewords.txt](https://github.com/NazirArifin/stemmer-madura/raw/master/basewords.txt) dan [stopwords.txt](https://github.com/NazirArifin/stemmer-madura/raw/master/stopwords.txt). 


Contoh berikut adalah kode TypeScript pengunaan stemmer-madura untuk melakukan proses stemming kata "nglerek"

```ts
import { Stemmer, Files } from 'stemmer-madura';

const stemmer: Stemmer = new Stemmer;

// load basewords and stopwords file menggunakan bantuan Files
const myFile: Files = new Files(stemmer);
try {
  stemmer.baseWords = files.readWordsFile('base');
  stemmer.stopWords = files.readWordsFile('stop');
} catch (error) {
  console.log(error);
}

stemmer.input = 'nglerek';
console.log(stemmer.stemWords());
```