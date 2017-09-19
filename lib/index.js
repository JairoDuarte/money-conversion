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
		result: function (to, from, value,collback) {
			api.live(liveQuery, function (err, result) {
				if (err) {
					console.log(err);
					 console.log('Live (Error): ' + JSON.stringify(err));
				}else{	
					var string = JSON.stringify(result.quotes);
					var quotes = JSON.parse(string);
					 
					var _from = quotes['USD'+from], _to = quotes['USD'+to];

					collback(from == 'USD' ? this.conversion(value,_to) : this.conversion(value,_from/_to));
				}
			});
		}
    };

    return currency;

};
