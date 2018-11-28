var _ = require('lodash');
var path = require('path');
var async = require('async');
var utils = require('../lib/utils');

var APIPath = path.join(__dirname, '../', 'index');
var API = require(APIPath);

var api = new API({
    access_key: process.env.ACCESS_KEY
});


// TEST START

var assert = require('assert');


describe('#list()', function () {

    this.timeout(10000);

    it('result with equivalent to as many currencies as found in the embedded test set', function (done) {

        async.waterfall(
            [
                function (stepCallback) {
                    var fs = require('fs');
                    fs.readFile(path.join(__dirname, 'data', 'currencies.json'), {encoding: 'UTF8'}, function (err, result) {
                        result = JSON.parse(result);
                        stepCallback(err, result.currencies);
                    });

                },
                function (currencies, stepCallback) {
                    var list = api.list;
                    list()
                        .then(function (result) {

                            // parse the results to make the caller only get the actual data and hide the transport information
                            result = _.get(result, list.CONTENT_EXPR);

                            var diff1 = utils.difference(currencies, result);
                            assert.equal(0, diff1.length, 'Following currencies are not found in the currencies service: ' + diff1);

                            var diff2 = utils.difference(result, currencies);
                            assert.equal(0, diff2.length, 'Following currencies are not found in the local file: ' + diff2);

                            stepCallback();
                        })
                        .catch(function (err) {
                            stepCallback(err);
                        });
                }
            ],
            function (err) {
                return done(err);
            }
        )
    });
});