var API = require('currency-conversion');
var api = new API({
    access_key: 'access_key'
});

var liveQuery = {
};

api.live(liveQuery)
    .then(function (result) {
        console.log('Live Promise Resolve: ' + JSON.stringify(result));
    })
    .catch(function (err) {
        console.log('Live Promise Reject: ' + JSON.stringify(err));
    });