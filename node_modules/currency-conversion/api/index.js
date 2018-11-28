'use strict';

var _ = require('lodash');

var API = {};

API.change = require('./change');
API.convert = require('./convert');
API.historical = require('./historical');
API.list = require('./list');
API.live = require('./live');
API.timeframe = require('./timeframe');

API.get = function (name) {
    var api = _.get(this, name);
    return api;
};

/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;