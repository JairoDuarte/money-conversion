'use strict';

var request = require('request');
var _ = require('lodash');

var utils = require('./utils');
var pkg = require('../package.json');


/**
 * Default transporter constructor.
 * Wraps request and callback functions.
 */
function Transporter(options) {
    this.options = options;
}

/**
 * Default user agent.
 */
Transporter.prototype.USER_AGENT = pkg.name + '.' + pkg.version;

/**
 * Configures request options before making a request.
 * @param {object} opts Options to configure.
 * @return {object} Configured options.
 */
Transporter.prototype.configure = function (args) {

    // set transporter user agent
    var headers = this.options.headers || {};
    headers['User-Agent'] = this.USER_AGENT;

    args = utils.extend(
        this.options,
        args,
        {headers: headers}
    );

    return args;
};

/**
 * Makes a request with given options and invokes callback.
 * @param {object} opts Options.
 * @param {Function=} opt_callback Optional callback.
 * @return {Request} Request object
 */
Transporter.prototype.request = function (args, callback) {

    args = this.configure(args);

    if (args.transporter == 'http') {

        var http = require('http');

        var query = {
            protocol: args.secure ? 'https:' : 'http:',
            host: args.host,
            path: '/'+ args.context +'/'+ args.service +'?'+ args.key_type +'=' + args.access_key,
            headers: args.headers
        };

        _.each(_.keys(args.qs), function(qsKey) {
            query.path += '&'+ qsKey +'='+ _.get(args.qs, qsKey);
        });

        var req = http.request(query, function (response) {

            if (response.statusCode == 304) {
                req.abort();
                return callback(null, null, response);
            }

            var result = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                result += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {

                result = JSON.parse(result);
                response.body = result;

                if(result.error) {
                    return callback(result.error);
                }

                callback(null, result, response);
            });
        });

        req.on('error', function (err) {
            req.abort();
            //callback(err);
        });

        req.end();

        return req;
    }

    var req = request(args, function (err, response, body) {
        if (err) {
            return callback(err);
        }
        callback(null, body, response)
    });
    return req;
};

/**
 * Exports Transporter.
 */
module.exports = Transporter;