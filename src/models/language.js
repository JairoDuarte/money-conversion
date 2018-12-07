'use strict';
const inquirer = require('inquirer')
class Language{
    constructor (content = {}){
        this._name = content.language || '';
        this._status = content.config || false;
        this._content = content.name || content[this._name];
    }
    
    get name () {
        return this._name;
    }
    get status () {
        return this._status;
    }
    set name (name) {
        this._name = name;
        this._status = true;
    }
    set status(status){
        this._status = status;
    }
    get content () {
        return this._content;
    }

    static languagePrompt (listOflanguage) {
        const question = {
          choices: [],
          message: 'Choose the language',
          name: 'language',
          type: 'list',
          filter: function(answer) {
            return listOflanguage.find(language => language.content === answer)
          },
        }
        question.choices = listOflanguage.map(language => language.content)
      
        return inquirer.prompt(question)
    }
        
}

module.exports = Language