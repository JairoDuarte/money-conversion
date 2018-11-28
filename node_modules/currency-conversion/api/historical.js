'use strict';

var _ = require('lodash');
var utils = require('../lib/utils');
var Promise = require('../lib/promise');
var APIError = require('../lib/apirequest-error');


// Declare our main module scope
var API;

/**
 * Historical Currency Rates
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
        else if (!_.has(params, API.PARAM_DATE)) {
            return reject(new APIError.MissingArgumentError(API.SERVICE_NAME, 'params.' + API.PARAM_DATE));
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


var HistoricalQuery = function (date, currencies, source) {
    this.date = date;
    this.currencies = currencies;
    this.source = source;
};
API.HistoricalQuery = HistoricalQuery;


API.SERVICE_NAME = 'historical';
API.SERVICE_METHOD = 'GET';
API.CONTENT_EXPR = 'quotes';
API.PARAM_DATE = 'date';
API.PARAM_DATE_PATTERN = 'YYYY-MM-DD';


/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;