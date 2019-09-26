
const {addUser, getUsers,updateUser} = require('../controller/controller')
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

router.post('/dataService', addUser)  
// router.get('/dataService', getUsers)
// router.put('/dataService', updateUser);

exports.router = router