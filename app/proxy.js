//
// Name:    Proxy Controller
// Purpose: Routes incoming calls to external API services.
// Creator: Tom Söderlund
//

'use strict';

var request = require('request');

// Private methods

// ----- CATCH ALL -----

var requestCatchall = function (req, res) {
	var relativePath = req.originalUrl.substring(req.params.hostname.length + 1);
	var fullPath = req.protocol + '://' + req.params.hostname + relativePath;
	request({ method: req.method, url: fullPath, json: req.body }, function (err, response, body) {
		if (err || response.statusCode !== 200) {
			return res.status(response.statusCode).json({ error: err, message: body, statusCode: response.statusCode });
		} else {
			return res.status(response.statusCode).json(body);
		}
	});
};

// Public methods

module.exports = {

	requestCatchall: requestCatchall

};