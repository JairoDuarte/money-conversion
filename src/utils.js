const fs = require('fs');
var content = require('./language.json');

function changelanguage (language = 'Eng') {
  content.Language = language;
  const output = JSON.stringify(content);
  fs.writeFile("./language.json", output, 'utf8',function (err) { if (err) return console.log(err); });
}

function getconfig() {
  return content.config;
}

function conflanguage(language) {
  content.config = true;
  changelanguage(language);
}

function getlanguage() {
  if (content.Language == 'Pt') {
    return content.Pt;
  }
  else if (content.Language == 'Eng') {
    return content.Eng;
  }
  else
    return content.Fr;
}
function init(colors) {
  console.log(colors.green('Please choose an language:'));
  console.log(colors.italic.red('1 - English '));
  console.log(colors.italic.red('2 - French '));
  console.log(colors.italic.red('3 - Porguese '));
}
module.exports.language = {changelanguage, conflanguage, getlanguage, init, getconfig}