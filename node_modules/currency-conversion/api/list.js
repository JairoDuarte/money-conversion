'use strict';

var _ = require('lodash');
var utils = require('../lib/utils');
var Promise = require('../lib/promise');

// Declare our main module scope
var API;

/**
 * List of Supported Currencies
 *
 * @param  {object} params - Parameters for request
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Result
 */
API = function (params, callback) {

    // Ensure callback is set to make the main functions slightly simpler by avoiding nested conditionals
    callback = callback || _.noop;


    // Set Options for the Request
    var options = utils.extend({}, this.options, {
            service: API.SERVICE_NAME,
            method: API.SERVICE_METHOD
        }
    );

    // Prepare Parameters and prepare it for the Request modus
    params = {
        options: options,
        params: {
            json: true,
            qs: params
        }
    };

    // Declare the main function where we call the API
    var requestFn = function (resolve, reject) {

        var APIRequest = require('../lib/apirequest');
        APIRequest.request(params, function (err, result) {

            // If an error happens, we return early
            if (err) {
                return reject(err);
            }

            // and we resolve and return (not necessary to return, but keeps consistency)
            return resolve(result);
        });
    };

    // Declare the promise we will use to wrap the request call
    var promise = new Promise(requestFn);

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

API.SERVICE_NAME = 'list';
API.SERVICE_METHOD = 'GET';
API.CONTENT_EXPR = 'currencies';

/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;