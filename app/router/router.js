
const {addEmployee, getEmployee, updateEmployee, getAllEmployee} = require('../controller/controller')
const { error } = require('../util/response')

const router = require('find-my-way')({
  defaultRoute: (request, response) => {
    const responseBody = {
      status: 'error',
      message: 'cant find route'
    }
    error(response, responseBody)
  }
})

router.post('/dataService', addEmployee)  
router.get('/dataService/:id', getEmployee)
router.put('/dataService', updateEmployee)
router.get('/dataService', getAllEmployee)

exports.router = router