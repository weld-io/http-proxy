var express = require('express');
var config = require('./config/config');

var app = express();

require('./config/express')(app, config);

console.log('http-proxy running on http://localhost:' + (process.env.PORT || config.port));
app.listen(process.env.PORT || config.port);