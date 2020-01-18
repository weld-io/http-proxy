/**
 * Application routes for REST
 */

'use strict'

const express = require('express')
const proxy = require('../app/proxy')

module.exports = function (app, config) {
  const router = express.Router()
  app.use('/', router)

  router.get('/:hostname/*', proxy.requestCatchall)
  router.post('/:hostname/*', proxy.requestCatchall)
  router.put('/:hostname/*', proxy.requestCatchall)
  router.delete('/:hostname/*', proxy.requestCatchall)
}
