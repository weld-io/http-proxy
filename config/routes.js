/**
 * Application routes for REST
 */

'use strict';

var express = require('express');
var url = require('url');
var proxy = require('express-http-proxy');


module.exports = function (app, config) {

	// https://api.instagram.com/v1/tags/design/media/recent?access_token=XXX
	// curl localhost:3014/v1/tags/design/media/recent?access_token=XXX
	var newHost = 'api.instagram.com';
	var apiProxy = proxy(newHost, {
		forwardPath: function (req, res) {
			var newPath = url.parse(req.originalUrl).path;
			//console.log('URLs', newPath, {originalUrl:req.originalUrl, url:req.url, baseUrl:req.baseUrl});
			return newPath;
		}
	});

	app.use('/*', apiProxy);

};