#!/usr/bin/env node
const { scanf } = require('nodejs-scanf');
const {app} = require('./index');
const {language} = require('./utils')
const colors = require('colors/safe');

const Console = console;
function init() {
  if (!language.getconfig()) {
    language.init(colors);
    scanf('%d',(choice)=>{
      console.log(choice);
      switch (choice) {
        case 1:
          language.conflanguage('Eng');
          break;
        case 2:
          language.conflanguage('Fr');
          break;
        case 3:
          language.conflanguage('Pt');
          break;
        default:
          language.changelanguage('Eng');
      }
    }); 
  }
}
init();
const language_ = language.getlanguage();

var choice = false;
while (choice) {
  console.log(language_.form1);
  console.log(`1 - ${language_.choice1}`);
  console.log(`2 - ${language_.choice2}`);
  console.log(`3 - ${language_.choice3}`);
  scanf('%d',(cx) =>{
    switch (cx) {
      case 1:
        
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        
    }
  })

  Console.log(colors.green('Please input value in format: from to money'));
  Console.log(colors.italic.red('Ex: USD EUR 100'));
  Console.log(colors.bold(':help  -> if you need help'));
}


// input currency change and value maney
const print = function print(params, params1) {
  Console.log(colors.blue(' %s') + colors.magenta(' is  %s'), params, params1);
};
init();
scanf('%s %s %d', (from, to, value) => {
  if (from.toUpperCase() === ':HELP') {
    app.help();
  } else {
    app.result(from.toUpperCase(), to.toUpperCase(), value, print);
  }
});
