#!/usr/bin/env node
const { scanf } = require('nodejs-scanf');
const {app} = require('./index');
const colors = require('colors/safe');

const Console = console;

Console.log(colors.green('Please input value in format: from to money'));
Console.log(colors.italic.red('Ex: USD EUR 100'));
Console.log(colors.bold(':help  -> if you need help'));

// input currency change and value maney
const print = function print(params, params1) {
  Console.log(colors.blue(' %s') + colors.magenta(' is  %s'), params, params1);
};

scanf('%s %s %d', (from, to, value) => {
  if (from.toUpperCase() === ':HELP') {
    app.help();
  } else {
    app.result(from.toUpperCase(), to.toUpperCase(), value, print);
  }
});
