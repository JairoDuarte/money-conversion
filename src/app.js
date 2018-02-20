#!/usr/bin/env node
const scanf = require('scanf');
const {app} = require('./index');
const {language} = require('./utils')
const colors = require('colors/safe');
const _this = this;
const Console = console;
var choice = true,cx;

function print (params, params1) {
  Console.log(colors.blue(' %s') + colors.magenta(' is  %s'), params, params1);
}
function init() {
  if (!language.getconfig()) {
    language.init(colors);
    var choice = scanf('%d');
    switch (choice) {
      case 1:
        language.conflanguage('Eng');
        break;
      case 2:
        language.conflanguage('Fr');
        break;
      case 3:
        language.conflanguage('Pt');
        break;
      default:
        language.changelanguage('Eng');
    }
  }
}
init();
const language_ = language.getlanguage();

async function menu() {
    do{
    console.log(colors.green(language_.form1));
    console.log(colors.bold(`1 - ${language_.choice1}`));
    console.log(colors.bold(`2 - ${language_.choice2}`));
    console.log(colors.bold(`3 - ${language_.choice3}`));
    cx = scanf('%d');
    switch (cx) {
      case 1:{
        var print = function (params, params1) {
          Console.log(colors.blue(' %s') + colors.magenta(' is  %s'), params, params1);
        }
        var t = scanf('%s %s %s');
        var from = t[0];
        var to = t[1];
        var value = t[2];
        console.log(typeof(_this));
        await app.result(from.toUpperCase(),to.toUpperCase(),value,print);
        break;
      }
      case 2:
        await app.help();
        break;
      case 3:
         return false;
      default: 
    }
  /*
    Console.log(colors.green('Please input value in format: from to money'));
    Console.log(colors.italic.red('Ex: USD EUR 100'));
    Console.log(colors.bold(':help  -> if you need help'));
    scanf('%s %s %d', (from, to, value) => {
      if (from != '' && to != '' && value != '' )
        app.result(from.toUpperCase(), to.toUpperCase(), value, print);
        console.log(to);
    }); */


  }while (choice);
}
menu();

// input currency change and value maney



