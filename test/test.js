var assert = require('assert');
var exemplo = require('../lib/index');
var app = require('../app')

describe("curreny", function() {
	describe("request", function() {
		it(' true', function() {
			assert.equal(true, true);
        });
        it('conversion', function() {
            assert.equal(12, app().conversion(10,1.2));
            
        });
        it('help', function() {
              assert.equal('Hello World', app().help());
        });
	});
});