exports.ok = (response, data) => {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(data))
    response.end()
  }
  
  exports.error = (response, data) => {
    response.statusCode = 400
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(data))
    response.end()
  }
  
  exports.unAuthorized = (response, data) => {
    response.statusCode = 401
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify(data))
    response.end()
  }
  