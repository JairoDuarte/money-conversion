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
        it('help', function() {
            app().help(function(res){
              assert.equal(200, res);
              
            });
        });
	});
});