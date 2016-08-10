/**
 * Application routes for REST
 */

'use strict';

var express = require('express');
var proxy = require('../app/proxy');

module.exports = function (app, config) {


	app.use('/' + proxy.yahooHost + '/*', proxy.yahooProxy);

	app.use('/' + proxy.instagramHost + '/*', proxy.requestInstagram);

};