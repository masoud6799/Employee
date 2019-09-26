const http = require('http')
const router = require('./router/router').router
const server = http.createServer()

server.on('request', function (request, response) {
  router.lookup(request, response)
})

server.listen(7000, function () {
  console.log(`server is running on port 7000`)
})
