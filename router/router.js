const router = require('find-my-way')({
    defaultRoute: (request, response, responseBody) => {
      serve(request, response, () => {
        if ((request.url).substr(0, 4) === '/api') {
          responseBody = {
            status: 'error',
            message: 'api does not exist'
          }
          error(response, responseBody)
        } else {
          request.url = 'error404.html'
          serve(request, response, finalhandler(request, response))
        }
      })
    }
  })
  
  exports.router = router