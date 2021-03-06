# http-proxy

Simple HTTP proxy server designed to solve AJAX CORS issues with some web services.

Made by the team at **Weld** ([www.weld.io](https://www.weld.io?utm_source=github-http-proxy)), the code-free app and web creation tool:

[![Weld](https://s3-eu-west-1.amazonaws.com/weld-social-and-blog/gif/weld_explained.gif)](https://www.weld.io?utm_source=github-http-proxy)


## Usage

	http://localhost:3014/REMOTE_HOST/PATH?QUERY

Example: instead of accessing:

	http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22stockholm%22)&format=json

you can use:

	http://localhost:3014/query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22stockholm%22)&format=json

### Options

Force HTTP request (otherwise same protocol as how you called `http-proxy`)

	&forceHTTP=true


## How to Run

We recommend setting up HTTPS on localhost, see [http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/)

Then, just start with:

	grunt

Server will default to **http://localhost:3014**


## Implementation

Built on Node.js and Express.


## Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku config:set NODE_ENV=production
