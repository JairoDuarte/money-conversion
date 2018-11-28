'use strict';

var _ = require('lodash');
var utils = require('../lib/utils');
var Promise = require('../lib/promise');
var APIError = require('../lib/apirequest-error');


// Declare our main module scope
var API;

/**
 * Convert Currency Rates
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
        else if (!_.has(params, API.PARAM_FROM)) {
            return reject(new APIError.MissingArgumentError(API.SERVICE_NAME, 'params.' + API.PARAM_FROM));
        }
        else if (!_.has(params, API.PARAM_TO)) {
            return reject(new APIError.MissingArgumentError(API.SERVICE_NAME, 'params.' + API.PARAM_TO));
        }
        else if (!_.has(params, API.PARAM_AMOUNT)) {
            return reject(new APIError.MissingArgumentError(API.SERVICE_NAME, 'params.' + API.PARAM_AMOUNT));
        }

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


var ConvertQuery = function (from, to, amount, date) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.date = date;
};
API.ConvertQuery = ConvertQuery;


API.SERVICE_NAME = 'convert';
API.SERVICE_METHOD = 'GET';
API.CONTENT_EXPR = 'info.quote';
API.PARAM_FROM = 'from';
API.PARAM_TO = 'to';
API.PARAM_AMOUNT = 'amount';
API.PARAM_DATE = 'date';
API.PARAM_DATE_PATTERN = 'YYYY-MM-DD';

/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;