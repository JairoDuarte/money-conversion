#!/usr/bin/env node
'use strict';
const inquirer = require('inquirer')
const ora = require('ora')
const figlet = require('figlet')
const scanf = require('scanf');
const colors = require('colors/safe');
const Language = require('../models/language');
const DataBase = require('../bin/db');
const currencies = require('./outils');
const converter = require('./converter');
const Console = console;


const initialQuestion = (listOfelements,message) => {
  let list;
  return inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'converter',
      message: message,
      source: async function(answersSoFar, input = ' ') {
        list = await listOfelements.filter(question => question.name.toUpperCase().includes(input.toUpperCase()))
        return list.map(question => question.name)
      },
      filter: function(answer) {
        return listOfelements.find(question => question.name === answer)
      },
    },
  ]);
}
const questionValue = (message)=>{
  return inquirer.prompt({
    type: 'input',
    name: 'value',
    message: message
  });
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
      return listOfchoose.find(language => language.content === answer);
    },
  }
  question.choices = listOfchoose.map(language => language.content);

  return inquirer.prompt(question);
}

let init = async () => {
  const spinner = ora()
  console.log(figlet.textSync('MONEY - CONVERTER'))
  inquirer.registerPrompt('autocomplete',require('inquirer-autocomplete-prompt'))

  await initialLanguage();
  const language = new Language(DataBase.content());
  let  choose,from,value,to,result;
  do {
    //spinner.start(language.content.form1);
    choose = (await menuPrompt([{content:language.content.choice1,value:1},{content:language.content.choice2,value:2},{content:language.content.choice3,value:3}],language.content.form1)).choose;
    switch (choose.value) {
      case 1:
        console.log(choose);
        from = (await initialQuestion(currencies,language.content.form2)).converter;
        to = (await initialQuestion(currencies,language.content.form3)).converter;
        value = (await questionValue(language.content.form4)).value;
        spinner.start("Coverting...");
        result = await converter.converter(from.code, to.code , value);
        spinner.succeed(result + ' '+to.code);
        break;
      case 2:
        break;
      case 3:
        return false;
    }
  } while (true);
}

init();