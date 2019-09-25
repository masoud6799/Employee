
const {addemployee} = require('../controller/controller')
const { error } = require('../util/response')

const router = require('find-my-way')({
  defaultRoute: (request, response) => {
    const responseBody = {
      status: 'error',
      message: ''
    }
    error(response, responseBody)
  }
})

  
router.put('/dataService', addemployee);

exports.router = router