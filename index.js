const server = require('./server').server
const PORT = 81

server.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`)
})
