const fs = require('fs');
var content = require('./language.json');

function changelanguage (language = 'Eng') {
  content.Language = language;
  const output = JSON.stringify(output);
  fs.writeFile("./language.json", output, 'utf8',(err) => { if (err) return console.log(err);});
}

function conflanguage(language) {
  content.config = true;
  changelangue(language);
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
module.exports.language = {chageLangue, conflanguage, getlanguage}