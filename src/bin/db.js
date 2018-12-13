'use strict';

const fs =  require ('fs');
var content = require('./db.json');

class Database {

	// Save language chosen by user
	static savelanguage (language) {
		content.language = language.name;
		content.status = language.status;
		content.cont_api_key = 0;
		const output = JSON.stringify(content);
		fs.writeFile(__dirname +'/db.json', output, 'utf8', (err) => {
			if (err) return console.log(err); 
		}); 
	}

	// Save language chosen by user
	static savecont (cont) {
		content.cont_api_key = cont;
		const output = JSON.stringify(content);
		fs.writeFile(__dirname +'/db.json', output, 'utf8', (err) => {
			if (err) return console.log(err); 
		}); 
	}
  
	// return the default language 
	static content () {
		return content;
	}

	// return true if user number conversion without access key <=10 or false
	static api_key(){
		let value = content.cont_api_key;
		if (value >9 ) {
			return false;
		} else {
			value++;
			Database.savecont(value);
			return true;
		}
	}
}

module.exports = Database;