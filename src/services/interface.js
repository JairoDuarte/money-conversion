#!/usr/bin/env node
'use strict';
const inquirer = require('inquirer')
const ora = require('ora')
const figlet = require('figlet')
const scanf = require('scanf');
const colors = require('colors/safe');
const Language = require('../models/language');
const DataBase = require('../bin/db');
const Console = console;

const initialLanguage = async () => {
  let content = DataBase.content();
  if (!content.status) {
    let listOflanguage = [];
    listOflanguage.push(new Language({name:'English',language:'Eng'}));
    listOflanguage.push(new Language({name:'French',language:'Fr'}));
    listOflanguage.push(new Language({name:'Portuguese',language:'Pt'}));
    let language = (await Language.languagePrompt(listOflanguage)).language;
    language.status = true;
    console.log(language);
    console.log('name '+language.name);
    console.log('langue '+language.content);
    DataBase.savelanguage(language);
  }
}

let init = async () => {
  const spinner = ora()
  console.log(figlet.textSync('MONEY - CONVERTER'))
  inquirer.registerPrompt(
    'autocomplete',
    require('inquirer-autocomplete-prompt')
  )
  initialLanguage();
  const language = new Language(DataBase.content());
}

init();


const print = function (params, params1) {
  Console.log(colors.white(` ${params}`) + colors.white(` ${language_.is} ${params1}`));
}

async function menu() {
  var cx;
  do{
  console.log(colors.green(language_.form1));
  console.log(colors.bold(`1 - ${language_.choice1}`));
  console.log(colors.bold(`2 - ${language_.choice2}`));
  console.log(colors.bold(`3 - ${language_.choice3}`));
  cx = scanf('%d');
  switch (cx) {
    case 1:{
      console.log(colors.yellow(language_.form2));
      var t = scanf('%s %s %s');
      var from = t[0];
      var to = t[1];
      var value = t[2];
      if (from != '' && to != '' && value != '' )
        await app.result(from.toUpperCase(),to.toUpperCase(),value,print);
      break;
    }
    case 2:
      await app.help();
      break;
    case 3:
        return false;
  }
  }while (true);
}
//menu();

