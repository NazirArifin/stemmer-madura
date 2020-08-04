# Stemmer Madura

[![Build Status](https://travis-ci.com/NazirArifin/stemmer-madura.svg?token=2v7QpAPuXVQmyEXNWo3j&branch=master)](https://travis-ci.com/NazirArifin/stemmer-madura)

Stemmer untuk bahasa Madura menggunakan rule-based.

## Penggunaan Dalam Mode CLI

### Instalasi

Agar dapat menggunakan stemmer-madura dalam CLI maka package harus diinstall global

```sh
npm install -g stemmer-madura
```

### Penggunaan

Stemmer-madura akan mencari file kata dasar (defaultnya: __basewords.txt__) dan file kata umum (defaulnya: __stopwords.txt__) pada direktori aktif dimana perintah dijalankan. Dalam package ini disertakan file [basewords.txt](https://github.com/NazirArifin/stemmer-madura/raw/master/basewords.txt) dan [stopwords.txt](https://github.com/NazirArifin/stemmer-madura/raw/master/stopwords.txt). 

Contoh penggunaan dalam mode CLI adalah:

```sh
stemmer-madura nglerek
```

Output yang dihasilkan terdiri dari dua baris yaitu kata input dan kata hasil stemming jika sukses dan hanya satu baris kata input jika gagal

### Verbose

Dengan menambahkan argument ```--verbose``` akan didapatkan informasi perubahan kata hingga didapatkan kata dasar.

```sh
stemmer-madura nglerek --verbose
```

## Penggunaan Sebagai Package

Contoh berikut adalah kode TypeScript pengunaan stemmer-madura untuk melakukan proses stemming kata "nglerek"

```ts
import { Stemmer, Files } from 'stemmer-madura';

const stemmer: Stemmer = new Stemmer;

// load basewords and stopwords file
const myFile: Files = new Files(stemmer);
stemmer.baseWords = myFile.readWordsFile('base');
stemmer.stopWords = myFile.readWordsFile('stop');

stemmer.input = 'nglerek';
console.log(stemmer.stemWords());
```