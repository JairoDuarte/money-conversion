var path = require('path');
var moment = require('moment');
var _ = require('lodash');

var APIResult = require('../lib/apirequest-result');

var APIPath = path.join(__dirname, '../', 'index');
var API = require(APIPath);

var api = new API({
    access_key: process.env.ACCESS_KEY
});


// LIVE
var listQuery = {};
api.list(listQuery, function (err, result) {
    if (err) {
        return console.log('List Callback (Error): ' + JSON.stringify(err));
    }
    console.log('List Callback (Result): ' + JSON.stringify(result));
});


// LIVE
var liveQuery = {
    source: 'SGD',
    currencies: ['USD', 'THB']
};
var liveOptions = {
    refresh_rate: moment.duration(5, 'seconds').asMilliseconds()
};
api.live(liveQuery, function (err, result) {

    if (err) {
        return console.log('Live Callback (Error): ' + JSON.stringify(err));
    }

    if(result && ! api.lastResult) {
        console.log('Content is first arrival, setting previous response');
    }
    else if(result && api.lastResult) {
        if(result.timestamp == api.lastResult.timestamp) {
            console.log('Content is not updated, we are getting the cached result');
        }
        else {
            console.log('Content is updated, we are getting a new result');
        }
    }

    api.lastResult = result;

}, liveOptions);


// In order for the live refresh to work, we are preventing the process from exiting
(function wait() {
    if (true) {
        setTimeout(wait, 10000);
    }
})();