'use strict';
/* eslint-disable global-require */
const API = require('currency-conversion');
// api key for https://currencylayer.com/
const access_key = process.env.CURRENCYLAYER_ACESS_KEY || '1d36e5db73566dda4cf57cb2af474e19'
const api = new API({ access_key: [access_key]});
/* eslint-enable global-require */
const Console = console;
const liveQuery = { source: 'USD',currencies: []};

class Converter{
	static async help () {
		try {
			var result = await api.list(liveQuery);
		} catch (error) { 
			Console.log(error);
		}
		return result.currencies;
	}
	static async converter(from,to,value) {
		try {
			var result = await api.live(liveQuery); 
			const quotes = result.quotes;
			const $from = quotes[`USD${from}`];
			const $to = quotes[`USD${to}`];

			result = from.toUpperCase() === 'USD' ? value*$to : value*$to/$from;
			return result.toFixed(2);
		} catch (error) {
			Console.log(error);
		}
	}
}

module.exports = Converter;