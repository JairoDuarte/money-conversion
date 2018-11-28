const fs = require('fs');
var content = require('./src/bin/db.json');

function changelanguage (language) {
  content.Language = language.name;
  content.config = language.status;
  const output = JSON.stringify(content);
  fs.writeFile("./language.json", output, 'utf8',function (err) {
      if (err) return console.log(err); 
  }); 
}



function init(colors) {
  console.log(colors.green('Please choose an language:'));
  console.log(colors.italic.red('1 - English '));
  console.log(colors.italic.red('2 - French '));
  console.log(colors.italic.red('3 - Porguese '));
}
module.exports.language = {changelanguage, init}