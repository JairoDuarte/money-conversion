let {scanf} = require('nodejs-scanf');
let app = require('./lib/index');

console.log('Please input value in format: from to money');
console.log('Ex: USD EUR 100');
console.log(':help  -> if you need help');

// input currency change and value maney
var print = function (params, params1) {
    console.log(params +' is '+ params1);
}

scanf('%s %s %f', function(from, to,value) {
    
    if (from.toUpperCase()==':HELP') {
        app().help();
	}
	else{
        app().result(from,to,value,print);
	}
	
});
    