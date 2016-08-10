var express = require('express');
var config = require('./config/config');

var app = express();

require('./config/express')(app, config);

if (config.httpsEnabled) {
	console.log('http-proxy running on https://localhost:' + (process.env.PORT || config.port));
	// HTTP support
	var fs = require('fs');
	var https = require('https');
	https.createServer({
		key: fs.readFileSync('ssl/key.pem'),
		cert: fs.readFileSync('ssl/cert.pem')
	}, app).listen(process.env.PORT || config.port);

}
else {
	// e.g. Production
	console.log('http-proxy running on http://localhost:' + (process.env.PORT || config.port));
	app.listen(process.env.PORT || config.port);
}