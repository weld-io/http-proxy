/**
 * Application routes for REST
 */

'use strict';

var express = require('express');
var url = require('url');
var request = require('request');
var proxy = require('express-http-proxy');


module.exports = function (app, config) {

	// ----- YAHOO -----

	// https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
	// curl -v "localhost:3014/query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	var yahooHost = 'query.yahooapis.com';
	var yahooProxy = proxy(yahooHost, {
		forwardPath: function (req, res) {
			var trimmedPath = req.originalUrl.substring(yahooHost.length + 1);
			var newPath = url.parse(trimmedPath).path;
			//console.log('URLs', trimmedPath, newPath, {originalUrl:req.originalUrl, url:req.url, baseUrl:req.baseUrl});
			return newPath;
		}
	});
	app.use('/' + yahooHost + '/*', yahooProxy);


	// ----- INSTAGRAM -----

	// https://api.instagram.com/v1/tags/design/media/recent?access_token=XXX
	// curl -v localhost:3014/api.instagram.com/publicapi/v1/tags/design/media/recent?access_token=XXX
	var instagramHost = 'api.instagram.com';

	// var instagramProxy = proxy(instagramHost, {
	// 	forwardPath: function (req, res) {
	// 		var trimmedPath = req.originalUrl.substring(instagramHost.length + 1);
	// 		var newPath = url.parse(trimmedPath).path;
	// 		//console.log('URLs', trimmedPath, newPath, {originalUrl:req.originalUrl, url:req.url, baseUrl:req.baseUrl});
	// 		return newPath;
	// 	}
	// });

	var requestInstagram = function (req, res) {
		var trimmedPath = req.originalUrl.substring(instagramHost.length + 1);
		var newPath = url.parse(trimmedPath).path;
		var completePath = 'https://' + instagramHost + newPath;
		request.get(completePath, { json: true }, function (err, response, data) {
			return res.status(response.statusCode).json(data);
		});
	}

	app.use('/' + instagramHost + '/*', requestInstagram);

};