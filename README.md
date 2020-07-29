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

Stemmer-madura akan mencari file kata dasar (defaultnya: __basewords.txt__) dan file kata umum (defaulnya: __stopwords.txt__) pada direktori aktif dimana perintah dijalankan.  Contoh penggunaan dalam mode CLI adalah:

```sh
stemmer-madura nglerek
```

Output yang dihasilkan terdiri dari dua baris yaitu kata input dan kata hasil stemming

### Verbose

Dengan menambahkan argument ```--verbose``` akan didapatkan informasi perubahan kata hingga didapatkan kata dasar.

```sh
stemmer-madura nglerek --verbose
```

## Penggunaan Sebagai Package

