# http-proxy

Simple HTTP proxy server designed to solve AJAX CORS issues with some web services.


## Usage

	http://localhost:3014/REMOTE_HOST/PATH?QUERY

Example: instead of accessing:

	http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22stockholm%22)&format=json

you can use:

	http://localhost:3014/query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22stockholm%22)&format=json


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
