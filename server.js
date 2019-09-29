/* eslint-disable no-undef */
const http = require('http')
const router = require('./router/router').router
const server = http.createServer()

server.on('request', function (request, response) {
  router.lookup(request, response)
})

exports.server = server
