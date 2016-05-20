/**
 * Application routes for REST
 */

'use strict';

var express = require('express');
var url = require('url');
var proxy = require('express-http-proxy');


module.exports = function (app, config) {

	// https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
	// curl -v "localhost:3014/yahoo/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	var yahooPrefix = '/yahoo';
	var yahooProxy = proxy('query.yahooapis.com', {
		forwardPath: function (req, res) {
			var trimmedPath = req.originalUrl.substring(yahooPrefix.length);
			var newPath = url.parse(trimmedPath).path;
			//console.log('URLs', trimmedPath, newPath, {originalUrl:req.originalUrl, url:req.url, baseUrl:req.baseUrl});
			return newPath;
		}
	});
	app.use(yahooPrefix + '/*', yahooProxy);

	// https://api.instagram.com/v1/tags/design/media/recent?access_token=XXX
	// curl -v localhost:3014/instagram/publicapi/v1/tags/design/media/recent?access_token=XXX
	var instagramPrefix = '/instagram';
	var instagramProxy = proxy('api.instagram.com', {
		forwardPath: function (req, res) {
			var trimmedPath = req.originalUrl.substring(instagramPrefix.length);
			var newPath = url.parse(trimmedPath).path;
			//console.log('URLs', trimmedPath, newPath, {originalUrl:req.originalUrl, url:req.url, baseUrl:req.baseUrl});
			return newPath;
		}
	});
	app.use(instagramPrefix + '/*', instagramProxy);

};