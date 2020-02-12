//
// Name:    Proxy Controller
// Purpose: Routes incoming calls to external API services.
// Creator: Tom Söderlund
//

'use strict'

const request = require('request')

// Private methods

const requestCatchall = function (req, res) {
  // Ignored files
  if (req.url.includes('favicon.ico')) {
    return res.status(404).json({ message: 'Not found' })
  }
  // Build URL
  const { url, method, protocol, body } = req
  const hostAndPath = url.slice(1)
  const newProtocol = url.includes('forceHTTP=true')
    ? 'http'
    : protocol || 'https'
  const fullPath = newProtocol + '://' + hostAndPath
  // Request file
  console.log(`Requesting: ${fullPath}`)
  request(
    {
      method,
      url: fullPath,
      json: true,
      encoding: null,
      body
    },
    function (error, response, body) {
      const headers = response && response.headers
      const statusCode = response && response.statusCode
      const statusCodeOrDefault = statusCode || 404
      res.status(statusCodeOrDefault)
      if (error || statusCode !== 200) {
        // Error
        return res.json({ error, message: body, statusCode: statusCodeOrDefault })
      } else {
        // OK
        const headerNames = Object.keys(headers)
        for (const i in headerNames) {
          if (['content-type', 'content-length'].includes(headerNames[i])) {
            res.setHeader(headerNames[i], headers[headerNames[i]])
            console.log(`${headerNames[i]}: ${headers[headerNames[i]]}`)
          }
        }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', '*')
        return res.send(body)
      }
    }
  )
}

// Public methods

module.exports = requestCatchall
