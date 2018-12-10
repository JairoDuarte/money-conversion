# Conversor de Moedas [![npm version](https://badge.fury.io/js/conversor-moedas.svg)](https://badge.fury.io/js/conversor-moedas)


## Instalação
    npm i -g conversor-moedas


## Configuração

Antes de usar o conversor de moedas você precisa obter uma chave de autentificação da API currencylayer, pode ser obtida no endereço  [https://currencylayer.com/product](https://currencylayer.com/product), em seguida inserir no ficheiro lib/index.js . 
---
## Idioma
English, Frençais, Português
## Utilização
➜  ~ conversor-moedas 

Please choose an language:

1 - English 

2 - French 

3 - Porguese 

1

************* Choose an option ******************

1 - Converter 

2 - Help 

3 - Exit 

1

Please input value in format: From To Money => (USD EUR 1)

USD MAD 100

 100 USD is  915.5500999999999 MAD
 
************* Choose an option ******************

1 - Converter 

2 - Help 

3 - Exit 

3

➜  $ 

### Setup

    let api = new API({
        access_key: [ACCESS_KEY],
    });

## Autor
Jairo Duarte ([GitHub](https://github.com/jairoduarte))

---

# Sub - TV
> Download your subtitles via terminal

<p align="center">
  <img src="http://i.imgur.com/66TO4jx.png" height="100" width="100" alt="Logo">
  <p align="center">
    <img src="https://travis-ci.org/raulfdm/sub-tv.svg?branch=master" alt="Build bagde">
    <a href="https://david-dm.org/raulfdm/sub-tv" title="dependencies status"><img src="https://david-dm.org/raulfdm/sub-tv/status.svg"/></a>
  </p>
</p>

## Motivation
Search subtitles may be a easy task, but it can be better. We are used to access our favorite subtitles website, fill fields, click on links, buttons, etc... But wait! Look below how easy it can be:

<p align="center">
  <img src="https://media.giphy.com/media/3o6vXKXVYC1kx6pWO4/giphy.gif" alt="Animated Gif">
</p>

## Provider
Actually it have just one provider: [tv-subs.com](http://www.tv-subs.com/) and consequently we can only download **tv series** subtitles. But soon we will add more providers to fetch include movies subtitles.

## How use
>:warning: To use this, you must have Nodejs v7.6^

### Steps
- First of all, you must install this package globally:

```
npm i -g sub-tv
```

- Open your favorite terminal, type `subtv` and **Enter**
- Type the name of the tv serie, wait for the options to appear and select one
- Select which season you'd like to get
- Select the episode;
- Select the language;
- Select the release;

The subtitle will be downloaded in the same folder that the terminal is opened.

Enjoy!

## Roadmap
You can check the progress of this project [here](https://github.com/raulfdm/subtv/projects/1)

## Know Issues
- [Do not found subtitle](https://github.com/raulfdm/subtv/issues/1)
- [Cannot read property name from undefined](https://github.com/raulfdm/subtv/issues/1)

## License
[MIT License](https://github.com/afonsopacifer/open-source-boilerplate/blob/master/LICENSE.md) © [Raul Melo](https://rauldemelo.com.br)
