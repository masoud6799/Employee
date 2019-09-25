
const getRawBody = require('raw-body')
const ajv = require('ajv')
const {
  ok,
  error
} = require('../util/response')


exports.addemployee = (request, response) => {
    let responseBody = {}
    getRawBody(request)
      .then((bodyBuffer) => {
        const employee = JSON.parse(bodyBuffer.toString())
        let responseBody = {}

        const valid = ajv.validate(schema.updateEmployee, employee)
        const validatonError = ajv.errors
        if (valid) {
          userService.updateUser(user)
            .then((result) => {
              responseBody = {
                status: 'ok',
                result: result.rows[0]
              }
              ok(response, responseBody)
            })
            .catch((err) => {
              responseBody = {
                status: 'error',
                message: err.message
              }
              error(response, responseBody)
            })
        } else {
          responseBody = {
            status: 'error',
            message: validatonError
          }
          error(response, responseBody)
        }
      })
      .catch((err) => {
        responseBody = {
          status: 'error',
          message: err.message
        }
        error(response, responseBody)
      })
}