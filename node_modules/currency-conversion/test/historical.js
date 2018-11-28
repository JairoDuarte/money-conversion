var path = require('path');
var async = require('async');
var _ = require('lodash');

var utils = require('../lib/utils');


var APIPath = path.join(__dirname, '../', 'index');
var API = require(APIPath);

var api = new API({
    access_key: process.env.ACCESS_KEY
});


// TEST START
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');

describe('#historical()', function () {

    it('SGD as source against USD + THB', function (done) {

        var historical = api.get('historical');

        this.timeout(10000);

        var source = 'SGD';
        var currencies = ['USD', 'THB'];

        var query = new historical.HistoricalQuery('2005-02-01', currencies, source);
        historical(query)
            .then(function (result) {

                result = _.get(result, historical.CONTENT_EXPR);

                assert.equal(2, _.keys(result).length);

                _.each(currencies, function (currency) {
                    var propertyName = source + currency;
                    expect(result).to.have.property(propertyName);
                });

                return done();
            })
            .catch(function (err) {
                return done(err);
            });
    });
});