module.exports = function () {
    
    let {scanf} = require('nodejs-scanf');
    let API = require('currency-conversion');

    // api key for https://currencylayer.com/
    let api = new API({
	    access_key: ['1d36e5db73566dda4cf57cb2af474e19'],
    });

    // query for get live currency value
    var liveQuery = {
	source: 'USD',
	currencies: []
    };

    var currency = {
        help: function () {
            console.log("help");
            console.log(this.conversion(12,3));
            return("Hello World");
        },
        conversion: function (value,rate) {
            return value*rate;
        }
    };

    return {
        help: currency.help,
        conversion : currency.conversion
    };

};
