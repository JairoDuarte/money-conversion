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

describe('#change()', function () {

    it('USD to SGD & THB', function (done) {

        this.timeout(10000);

        var change = api.get('change');

        var duration = 7;

        var start_date = null; // moment().subtract(duration, 'days').format(change.PARAM_START_DATE_PATTERN);
        var end_date = null; // moment().format(change.PARAM_END_DATE_PATTERN);
        var currencies = ['USD', 'THB'];
        var source = 'SGD';

        var query = new change.ChangeQuery(start_date, end_date, currencies, source);
        change(query)
            .then(function (result) {

                result = _.get(result, change.CONTENT_EXPR);

                expect(_.keys(result)).to.have.length(currencies.length); // The API returns both days inclusive, so we need to add 1 to the requested duration

                _.map(_.keys(result), function (quoteKey) {

                    var quote = _.get(result, quoteKey);

                    expect(_.get(quote, change.RESULT_START_RATE)).to.be.a('number');
                    expect(_.get(quote, change.RESULT_END_RATE)).to.be.a('number');
                    expect(_.get(quote, change.RESULT_CHANGE)).to.be.a('number');
                    expect(_.get(quote, change.RESULT_CHANGE_PCT)).to.be.a('number');
                });

                return done();
            })
            .catch(function (err) {
                return done(err);
            });
    });
});