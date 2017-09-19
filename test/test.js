var assert = require('assert');
var app = require('../lib/index');

describe("curreny", function() {
	describe("request", function() {
		it(' true', function() {
			assert.equal(true, true);
        });
        it('conversion', function() {
            assert.equal(12, app().conversion(10,1.2));
            
        });
        it('result', function() {
            app().result('EUR','USD',10,function(params) {
                assert.equal(8,params);  
            });
        });
	});
});