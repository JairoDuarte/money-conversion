'use strict';

var _ = require('lodash');

var utils = require('../lib/utils');
var Promise = require('../lib/promise');
var APIError = require('../lib/apirequest-error');
var APIResult = require('../lib/apirequest-result');


// Declare our main module scope
var API;

/**
 * Live Currency Rates
 *
 * @param  {object} params - Parameters for request
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Result
 */
API = function (params, callback, options) {


    options = utils.defaults({}, options, this.options, {
            service: API.SERVICE_NAME,
            method: API.SERVICE_METHOD,
            transporter: 'http'
        }
    );


    // Declare the promise we will use to wrap the request call
    var promise = new Promise(function (resolve, reject) {


        // Input Validation (we only do the most basic, and let the server do the most so validation will always be up to date)
        if (!params) {
            return reject(new APIError.MissingArgumentError(API.SERVICE_NAME, 'params'));
        }

        //if (_.has(options, API.PARAM_REFRESH_RATE)) {
        //    return reject(new APIError.NotSupportedArgumentError(API.SERVICE_NAME, 'params.' + API.PARAM_REFRESH_RATE));
        //}

        var $params = _.clone(params);
        $params.currencies = _.isArray($params.currencies) ? $params.currencies.join(',') : $params.currencies;

        // Prepare Parameters and prepare it for the Request modus
        $params = {
            options: options,
            params: {
                json: true,
                qs: $params
            }
        };

        if (!_.isNull(API.lastResponse)) {

            var lastResponse = API.lastResponse;

            var etag = _.get(lastResponse.headers, 'etag');
            _.set($params.options.headers, 'If-None-Match', etag);

            var date = _.get(lastResponse.headers, 'date');
            _.set($params.options.headers, 'If-Modified-Since', date);
        }

        var APIRequest = require('../lib/apirequest');
        APIRequest.request($params, function (err, result, response) {

            if (_.has(options, API.PARAM_REFRESH_RATE)) {
                var refreshRate = _.get(options, API.PARAM_REFRESH_RATE);
                setTimeout(API, refreshRate, params, callback, options);
            }

            // If an error happens, we return early
            if (err) {
                return reject(err);
            }

            if (_.isNull(result) && _.has(response, API.CONTENT_EXPR)) {
                result = _.get(response, API.CONTENT_EXPR);
            }
            else if (_.isNull(result) && _.has(response, APIResult.BODY_EXPR)) {
                result = _.get(API.lastResponse, APIResult.BODY_EXPR);
            }

            switch(response.statusCode) {

                case APIResult.OK:
                    API.lastResponse = response;
                    break;

                case APIResult.NOT_CHANGED:
                    result = _.get(API.lastResponse, APIResult.BODY_EXPR);
                    break;
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

API.SERVICE_NAME = 'live';
API.SERVICE_METHOD = 'GET';
API.CONTENT_EXPR = 'quotes';
API.PARAM_REFRESH_RATE = 'refresh_rate';

API.lastResponse = null;

/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;