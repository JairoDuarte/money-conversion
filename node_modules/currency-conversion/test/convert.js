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

describe('#convert()', function () {

    it('SGD to THB for 100', function (done) {

        this.timeout(10000);

        var convert = api.get('convert');

        var from = 'SGD';
        var to = 'THB';
        var amount = 100;
        var date = '2005-02-01';

        var query = new convert.ConvertQuery(from, to, amount, date);
        convert(query)
            .then(function (result) {

                result = _.get(result, convert.CONTENT_EXPR);

                expect(result).to.be.a('number');

                return done();
            })
            .catch(function (err) {
                return done(err);
            });
    });
});