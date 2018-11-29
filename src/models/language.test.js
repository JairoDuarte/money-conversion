
'use strict';

const Language = require('./language')
let content = {language:'Eng',content: '',config: true,Eng:''};

describe('Language Class', () => {
  let language = new Language(content);
  test('should return correct name', () => {
    expect(language.name).toBe('Eng')
  })
  test('should return status', () => {
    expect(language.status).toBe(true)
  })
})
