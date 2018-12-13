#!/usr/bin/env node
'use strict';
const inquirer = require('inquirer');
const chalk = require('chalk');
const Language = require('../models/language');
const DataBase = require('../bin/db');

const accessKey = () => {
	if (process.env.CURRENCYLAYER_ACESS_KEY == undefined) {
		if (DataBase.api_key()) {
			console.log(chalk.yellow('Please set Environment variable $CURRENCYLAYER_ACESS_KEY. get your access key here https://currencylayer.com/'));
			console.log(chalk.yellow(`You can use the module ${10-DataBase.content().cont_api_key} time without Environment variable $CURRENCYLAYER_ACESS_KEY`));
			return true;
		}
		else {
			console.log(chalk.red('Environment variable $CURRENCYLAYER_ACESS_KEY is not set. see more https://github.com/JairoDuarte/money-conversion/blob/master/README.md'));
			process.exit(0);
		}
	}
}

const initialQuestion = (listOfelements,message) => {
	let list;
	return inquirer.prompt([
		{
			type: 'autocomplete',
			name: 'converter',
			message: message,
			source: async function(answersSoFar, input = ' ') {
				list = await listOfelements.filter(question => question.name.toUpperCase().includes(input.toUpperCase()));
				return list.map(question => question.name);
			},
			filter: function(answer) {
				return listOfelements.find(question => question.name === answer);
			},
		},
	]);
};
const questionValue = (message)=>{
	return inquirer.prompt({
		type: 'input',
		name: 'value',
		message: message
	});
};

const initialLanguage = async () => {
	accessKey()
	let content = DataBase.content();
	if (!content.status) {
		let listOflanguage = [];
		listOflanguage.push(new Language({name:'English',language:'Eng'}));
		listOflanguage.push(new Language({name:'French',language:'Fr'}));
		listOflanguage.push(new Language({name:'Portuguese',language:'Pt'}));
		let language = (await Language.languagePrompt(listOflanguage)).language;
		language.status = true;
		DataBase.savelanguage(language);
		return new Language(DataBase.content());
	}
	return new Language(content);
};

let menuPrompt = (listOfchoose,message) => {
	const question = {
		choices: [],
		message: message,
		name: 'choose',
		type: 'list',
		filter: function(answer) {
			return listOfchoose.find(language => language.content === answer);
		},
	};
	question.choices = listOfchoose.map(language => language.content);

	return inquirer.prompt(question);
};

module.exports = {menuPrompt, initialLanguage, initialQuestion, questionValue};