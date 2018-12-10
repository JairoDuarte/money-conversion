'use strict';

const fs =  require ('fs');
var content = require('./db.json');

class Database {
  
	static savelanguage (language) {
		content.language = language.name;
		content.status = language.status;
		const output = JSON.stringify(content);
		fs.writeFile('./src/bin/db.json', output, 'utf8', (err) => {
			if (err) return console.log(err); 
		}); 
	}
  
	static content () {
		return content;
	}

}

module.exports = Database;