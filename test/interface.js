const app = require('../src/index');
const colors = require('colors/safe');

const Console = console;
Console.log('hello'.green); // outputs green text

Console.log(colors.green('hello')); // outputs green text
Console.log(colors.red.underline('i like cake and pies')); // outputs red underlined text
const name = 'Marak';
Console.log(colors.bgGreen('Hello %s'), name);

app().result('USD', 'EUR', 10, (params, p) => {
  Console.log(params, p);
});
