#!/usr/bin/env node
'use strict';
const program = require('commander')
const inquirer = require('inquirer')
const ora = require('ora')
const figlet = require('figlet')
const {scanf} = require('nodejs-scanf');
const colors = require('colors/safe');

console.log(colors.green('Please input value in format: from to money'));
console.log(colors.italic.red('Ex: USD EUR 100'));
console.log(colors.bold(':help  -> if you need help'));

// input currency change and value maney
var print = function (params, params1) {
    console.log(colors.blue(' %s')+colors.magenta(' is  %s'),params,params1);
}

scanf('%s %s %f', function(from, to,value) {
    
    if (from.toUpperCase()==':HELP') {
        app().help();
	}
	else{
        app().result(from,to,value,print);
	}
});