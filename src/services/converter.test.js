'use strict';

const Converter = require('./converter');

describe('Test class converter', function () {
	test('should return help', async () =>{
		let currencies = await Converter.help();
		expect(currencies.AOA).toBe('Angolan Kwanza');
	});
	test('should return value converted usd to other currencie', async () =>{
		let value = await Converter.converter('USD', 'AOA', 10);
		let value1 = await Converter.converter('AOA', 'USD', value);
		expect(value1).toBe('10.00');
	});
	test('should return value converted other currencie to other currencie', async () =>{
		let value = await Converter.converter('MAD', 'AOA', 10); 
		let value1 = await Converter.converter('AOA', 'MAD', value); 
		expect(value1).toBe('10.00');
	});
});