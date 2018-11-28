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

describe('#timeframe()', function () {

    it('SGD to THB for 100', function (done) {

        this.timeout(10000);

        var timeframe = api.get('timeframe');

        var duration = 7;

        var start_date = moment().subtract(duration, 'days').format(timeframe.PARAM_START_DATE_PATTERN);
        var end_date = moment().format(timeframe.PARAM_END_DATE_PATTERN);
        var currencies = ['USD', 'THB'];
        var source = 'SGD';

        var query = new timeframe.TimeframeQuery(start_date, end_date, currencies, source);
        timeframe(query)
            .then(function (result) {

                result = _.get(result, timeframe.CONTENT_EXPR);

                _.map(_.keys(result), function (quoteKey) {

                    var quote = _.get(result, quoteKey);

                    var quoteKeys = _.keys(quote);

                    _.every(quoteKeys, function (quoteKey) {
                        expect(_.get(quote, quoteKey)).to.be.a('number');
                    })
                });

                return done();
            })
            .catch(function (err) {
                return done(err);
            });
    });
});