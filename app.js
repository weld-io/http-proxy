const express = require('express')
const config = require('./config/config')

const app = express()

require('./config/express')(app, config)

if (config.httpsEnabled) {
  console.log('http-proxy running on https://localhost:' + (process.env.PORT || config.port))
  // HTTP support
  const fs = require('fs')
  const https = require('https')
  https.createServer({
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
  }, app).listen(process.env.PORT || config.port)
} else {
  // e.g. Production
  console.log('http-proxy running on http://localhost:' + (process.env.PORT || config.port))
  app.listen(process.env.PORT || config.port)
}
