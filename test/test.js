var assert = require('assert');
var app = require('../src/index');

describe("curreny", function() {
	describe("request", function() {
		it(' true', function() {
			assert.equal(true, true);
        });
        it('conversion', function() {
            assert.equal(12, app().conversion(10,1.2));
            console.log('hell');
            
        });
        it('result', function() {
            app().result('EUR','USD',10,function(params1,params) {
                
                assert.equal('12.5 USD',params1);  
            });
        });
	});
});