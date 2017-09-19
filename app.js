let {scanf} = require('nodejs-scanf');
let app = require('./lib/index');

console.log('Please input value in format X Y money');
console.log('Ex: USD EUR 100');
console.log(':help  -> if you need help');

// input currency change and value maney

scanf('%s %s %f', function(to, from,value) {
    console.log(to.toUpperCase());
    if (to.toUpperCase()==':HELP') {
        
	}
	else{
        console.log('0');
	}
	
});
    