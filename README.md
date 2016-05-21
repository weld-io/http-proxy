# http-proxy

Simple HTTP proxy server designed to solve AJAX CORS issues with some web services.


## Usage

	http://localhost:3014/REMOTE_HOST/PATH?QUERY

Example: instead of accessing:

	https://api.instagram.com/v1/tags/design/media/recent?access_token=XXX

you can use:

	http://localhost:3014/api.instagram.com/v1/tags/design/media/recent?access_token=XXX


## How to Run

Just start with:

	grunt

Server will default to **http://localhost:3014**


## Implementation

Built on Node.js and Express.


## Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku config:set NODE_ENV=production
