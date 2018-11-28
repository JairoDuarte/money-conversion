
Node JavaScript wrapper for [the currencylayer API](https://currencylayer.com/).

Supports both traditional callbacks and Promises/A+.

---

## Installation
	npm install currency-conversion [--save]


## Configuration

Before using the currencylayer API client you have to setup your account and obtain your API Access Key.  
You can get it by signing up at [https://currencylayer.com/product](https://currencylayer.com/product).

---

## Usage

The general API is documented here: [https://currencylayer.com/documentation](https://currencylayer.com/documentation).  
You can find parameters, result set definitions and status codes documented here as well.


### Setup

	var API = require('currency-conversion');
	var api = new API({
    	access_key: [ACCESS_KEY],
    	secure: [true|false] (Optional, defaults to false)
	});

#### Optional Parameters

##### Secure (only available for Basic, Pro and Enterprise accounts)
Boolean value to indicate if the calls to the API should use a secure protocol or insecure (HTTP/HTTPS). Defaults to false (HTTP, insecure).

---

## Callbacks vs. Promises

The Promises/A+ implementation used for this is this excellent bare bones library:  
[https://www.npmjs.com/package/promise](https://www.npmjs.com/package/promise)

The language-detection library supports either mode and use of either one is not mutually exclusive to the alternative, so it's possible to use one exclusively or a combination, even in the same call, both the callback will be called and the promise handlers invoked.

---

## API Overview
All endpoints in the public API is available through this library.

- live
- list
- change
- convert
- historical
- timeframe

---

## Live
Takes a simple string and detects the language with a list of detections.

###### Define Query

	var liveQuery = {
    	source: 'SGD',
	    currencies: ['USD', 'THB']
	};

###### Simple Request (using Callback)

	api.live(liveQuery, function (err, result) {
    	if (err) {
        	return console.log('Live Callback (Error): ' + JSON.stringify(err));
    	}
	    console.log('Live Callback (Result): ' + JSON.stringify(result));
	});
    
###### Response
	{
  		"success": true,
		"terms": "https://currencylayer.com/terms",
		"privacy": "https://currencylayer.com/privacy",
		"currencies": {
 			"AED": "United Arab Emirates Dirham",
 			"AFN": "Afghan Afghani",
			"ALL": "Albanian Lek",
    		...
  		}
	}
	
#### Automatic Refresh

The Live API accepts a third argument which contains the options for the operation of the API.  

```
var liveOptions = {
    refresh_rate: [interval in milliseconds]
};
```

When the refresh_rate option is added, the API will update automatically and invoke the callbacks and promises accordingly. The example application illustrates this.

Internally the API uses the ETag and Date headers in the responses and If-None-Match and If-Modified-Since correspondingly on the requests. This reduces the payload sent from the server by utilising the 304 HTTP codes to use data from the internal cache instead of retrieving identical values from the server.
 
[https://currencylayer.com/documentation](https://currencylayer.com/documentation)

---

## Example Application

In the [rootdir]/example directory there is a fully functional application which runs all requests against all the endpoints in the API, the examples above can be seen there as source code.

The example application uses a process.env variable to hold the access key.

For running in development environments, it's easy to use the [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) to load variables from a local file into the environment.

---

## Tests [![Travis](https://travis-ci.org/apilayer/currency-conversion.svg)](Travis)

The tests are written for any NodeJS testing library, but has been run and targeted at the [https://mochajs.org/](https://mochajs.org/) testing library.

---

## Customer Support

Need any assistance? [Get in touch with Customer Support](mailto:support@apilayer.net?subject=%5Bcurrencylayer%5D).

---

## Updates
Stay up to date by following [@apilayernet](https://twitter.com/apilayernet) on Twitter.

---

## Legal

All usage of the languagelayer website, API, and services is subject to the [languagelayer Terms & Conditions](https://languagelayer.com/terms) and all annexed legal documents and agreements.

---

## Author
Peter Andreas Moelgaard ([GitHub](https://github.com/pmoelgaard), [Twitter](https://twitter.com/petermoelgaard))

---

## License
Licensed under the The MIT License (MIT)

Copyright (&copy;) 2016 Peter Andreas Moelgaard & apilayer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.