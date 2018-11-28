var path = require('path');
var async = require('async');
var moment = require('moment');
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

describe('#live()', function () {

    it('SGD as source against USD + THB', function (done) {

        this.timeout(10000);

        var source = 'SGD';
        var currencies = ['USD', 'THB'];

        var liveQuery = {
            source: source,
            currencies: currencies.join(',')
        };

        var live = api.live;
        live(liveQuery)
            .then(function (result) {

                result = _.get(result, live.CONTENT_EXPR);

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