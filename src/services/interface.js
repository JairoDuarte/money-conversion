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

const initialQuestion = () => {
  let series = []
  return inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'chosen',
      message: 'Type serie name, then choose it',
      source: async function(answersSoFar, input) {
        series = await fetchSeries(input)
        return series.map(serie => serie.label)
      },
      filter: function(answer) {
        return series.find(serie => serie.label === answer)
      },
    },
  ])
}

const initialLanguage = async () => {
  let content = DataBase.content();
  if (!content.status) {
    let listOflanguage = [];
    listOflanguage.push(new Language({name:'English',language:'Eng'}));
    listOflanguage.push(new Language({name:'French',language:'Fr'}));
    listOflanguage.push(new Language({name:'Portuguese',language:'Pt'}));
    let language = (await Language.languagePrompt(listOflanguage)).language;
    language.status = true;
    DataBase.savelanguage(language);
  }
}
let menuPrompt = (listOfchoose,message) => {
  const question = {
    choices: [],
    message: message,
    name: 'choose',
    type: 'list',
    filter: function(answer) {
      return listOfchoose.find(language => language.content === answer)
    },
  }
  question.choices = listOfchoose.map(language => language.content)

  return inquirer.prompt(question)
}

let init = async () => {
  const spinner = ora()
  console.log(figlet.textSync('MONEY - CONVERTER'))
  inquirer.registerPrompt(
    'autocomplete',
    require('inquirer-autocomplete-prompt')
  )
  await initialLanguage();
  const language = new Language(DataBase.content());
  let  choose;
  do {
    //spinner.start(language.content.form1);
    let listOflanguage = [];
    listOflanguage.push(new Language({name:'English',language:'Eng'}));
    listOflanguage.push(new Language({name:'French',language:'Fr'}));
    listOflanguage.push(new Language({name:'Portuguese',language:'Pt'}));
    choose = (await menuPrompt([{content:language.content.choice1,value:1},{content:language.content.choice2,value:2},{content:language.content.choice3,value:3}],language.content.form1)).choose;
    switch (choose.value) {
      case 1:
        console.log(choose);
        break;
      case 2:
        break;
      case 3:
        return false;
    }
  } while (true);
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

