'use strict';

const fs =  require ('fs')
var content = require('./db.json');

class Database {
  
  static savelanguage (language) {
    content.language = language.name;
    content.config = language.status;
    const output = JSON.stringify(content);
    fs.writeFile("./src/bin/db.json", output, 'utf8', (err) => {
        if (err) return console.log(err); 
    }); 
  }
  
  static content () {
    return content;
  }

}


function init(colors) {
  console.log(colors.green('Please choose an language:'));
  console.log(colors.italic.red('1 - English '));
  console.log(colors.italic.red('2 - French '));
  console.log(colors.italic.red('3 - Porguese '));
}
module.exports = Database