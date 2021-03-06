var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	env = process.env.NODE_ENV || 'development';

var config = {

	development: {
		root: rootPath,
		app: {
			name: 'http-proxy'
		},
		httpsEnabled: true,
		port: 3014,		
	},

	test: {
		root: rootPath,
		app: {
			name: 'http-proxy'
		},
		httpsEnabled: true,
		port: 3000,		
	},

	production: {
		root: rootPath,
		app: {
			name: 'http-proxy'
		},
		httpsEnabled: false, // handled by Heroku’s load balancers
		port: 3000,
	}

};

module.exports = config[env];