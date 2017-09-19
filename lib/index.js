module.exports = function () {
    
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
			api.list(liveQuery, function (err, result) {
				if (err) {
					console.log(err);
					 console.log('Live (Error): ' + JSON.stringify(err));
				}else{	
					console.log('Currencies: ');			
					console.log(result.currencies);
				}
			});
        },
        conversion: function (value,rate) {
            return value*rate;
		},
		getlist: function (to, from, value) {
			api.live(liveQuery, function (err, result) {
				if (err) {
					console.log(err);
					 console.log('Live (Error): ' + JSON.stringify(err));
				}else{	
					var string = JSON.stringify(result.quotes);
					var objectValue = JSON.parse(string);
					 console.log(objectValue['USDUSD']);

					var _from = result.quotes;
					console.log('Currencies: ');			
					//console.log(result.currencies);
				}
			});
		}
    };

    return {
        help: currency.help,
        conversion : currency.conversion
    };

};
