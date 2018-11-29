'use strict'

const Database = require('./db');
const Language  = require('../models/language');

describe('Database Classe', () =>{
    let language = new Language(Database.content());
    test('should return content', () =>{
        expect(Database.content().config).toBe(false);
    })
    test('save language in db',() =>{
        language = new Language();
        language.name = 'Eng';
        language.status = false;
        Database.savelanguage(language); 
        expect(Database.content().language).toBe(language.name);
    })
    test('get language in db', () =>{
        language = new Language(Database.content());
        expect(language.content.name).toBe('English ');
    })
})