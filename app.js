#!/usr/bin/env node
<<<<<<< HEAD
let {scanf} = require('nodejs-scanf');
let app = require('./lib/index');
let colors = require('colors/safe');
=======
const app = require('./lib/index'),
colors = require('colors/safe'),
{scanf} = require('nodejs-scanf');
>>>>>>> 77551d87baa1effd822ece8bdcc05bfca175387a

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
    