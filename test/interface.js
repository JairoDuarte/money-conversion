var app = require('../src/index'),
colors = require('colors/safe');

console.log('hello'.green); // outputs green text 

console.log(colors.green('hello')); // outputs green text 
console.log(colors.red.underline('i like cake and pies')) // outputs red underlined text 
var name = 'Marak';
console.log(colors.bgGreen('Hello %s'), name);

app().result('USD','EUR',10,function (params,p) {
    console.log(params,p);    
});