'use strict';

var _ = require('lodash');
var utils = require('../lib/utils');
var Promise = require('../lib/promise');
var APIError = require('../lib/apirequest-error');


// Declare our main module scope
var API;

/**
 * Change Currency Rates
 *
 * @param  {object} params - Parameters for request
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Result
 */
API = function (params, callback, options) {


    options = utils.defaults({}, options, this.options, {
            service: API.SERVICE_NAME,
            method: API.SERVICE_METHOD
        }
    );

    // Declare the promise we will use to wrap the request call
    var promise = new Promise(function (resolve, reject) {

        // Input Validation (we only do the most basic, and let the server do the most so validation will always be up to date)
        if (!params) {
            return reject(new APIError.MissingArgumentError(API.SERVICE_NAME, 'params'));
        }

        params = _.clone(params);
        params.currencies = _.isArray(params.currencies) ? params.currencies.join(',') : params.currencies;

        // Prepare Parameters and prepare it for the Request modus
        params = {
            options: options,
            params: {
                json: true,
                qs: params
            }
        };


        var APIRequest = require('../lib/apirequest');
        APIRequest.request(params, function (err, result) {

            // If an error happens, we return early
            if (err) {
                return reject(err);
            }

            // and we resolve and return (not necessary to return, but keeps consistency)
            return resolve(result);
        });
    });


    // Ensure callback is set to make the main functions slightly simpler by avoiding nested conditionals
    callback = callback || utils.noop;

    // We offer callback support in addition to promise style (we know callback is set as we default it in the beginning)
    promise
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err);
        });


    // return the promise to the caller
    return promise;
};


var ChangeQuery = function (start_date, end_date, currencies, source) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.currencies = currencies;
    this.source = source;
};
API.ChangeQuery = ChangeQuery;


API.SERVICE_NAME = 'change';
API.SERVICE_METHOD = 'GET';
API.CONTENT_EXPR = 'quotes';
API.PARAM_START_DATE = 'start_date';
API.PARAM_START_DATE_PATTERN = 'YYYY-MM-DD';
API.PARAM_END_DATE = 'end_date';
API.PARAM_END_DATE_PATTERN = 'YYYY-MM-DD';
API.PARAM_CURRENCIES = 'currencies';
API.PARAM_SOURCE = 'source';
API.RESULT_START_RATE = 'start_rate';
API.RESULT_END_RATE = 'end_rate';
API.RESULT_CHANGE = 'change';
API.RESULT_CHANGE_PCT = 'change_pct';


/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;