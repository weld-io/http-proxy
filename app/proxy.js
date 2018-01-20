//
// Name:    Proxy Controller
// Purpose: Routes incoming calls to external API services.
// Creator: Tom Söderlund
//

'use strict';

var _ = require('lodash');
var request = require('request');

// Private methods

// ----- CATCH ALL -----

var requestCatchall = function (req, res) {
	var relativePath = req.originalUrl.substring(req.params.hostname.length + 1);
	var fullPath = req.protocol + '://' + req.params.hostname + relativePath;
	// Conditionals
	if (fullPath.indexOf('forceHTTP=true') !== -1) {
		fullPath = fullPath.replace('https:', 'http:');
	}
	console.log('Requesting: %s', fullPath);
	request({ method: req.method, url: fullPath, json: true, body: req.body }, function (err, response, body) {
		console.log('Response summary: err=%s, type=%s', err, typeof(body));
		//console.log('response:', response);
		//console.log('body:', body);
		const ERROR_CODE = 409;
		if (err || _.get(response, 'statusCode') !== 200) {
			return res.status(_.get(response, 'statusCode', ERROR_CODE)).json({ error: err, message: body, statusCode: _.get(response, 'statusCode') });
		}
		else {
			return res.status(_.get(response, 'statusCode', ERROR_CODE)).send(body);
		}
	});
};

// Public methods

module.exports = {

	requestCatchall: requestCatchall

};