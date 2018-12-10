#!/usr/bin/env node
'use strict';
const inquirer = require('inquirer');
const Language = require('../models/language');
const DataBase = require('../bin/db');

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