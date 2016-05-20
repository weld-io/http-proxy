# http-proxy

HTTP proxy server.

## Usage

	http://localhost:3014/post/42423/my-post-url?debug=true

## How to Configure

...

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
