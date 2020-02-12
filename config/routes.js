/**
 * Application routes for REST
 */

'use strict'

const express = require('express')
const proxy = require('../api/proxy')

module.exports = function (app, config) {
  const router = express.Router()
  app.use('/', router)

  router.get('/:hostname/*', proxy)
  router.post('/:hostname/*', proxy)
  router.put('/:hostname/*', proxy)
  router.delete('/:hostname/*', proxy)
}
