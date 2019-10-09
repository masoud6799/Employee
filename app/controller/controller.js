/* #region variable */
const mongod = require('../mongodb/mongodb')
const Ajv = require('ajv')
const url = require('url')
const querystring = require('querystring')
const getRawBody = require('raw-body')
const { ok, error } = require('../util/response')
const schema = require('../schema/schema')
const ajv = new Ajv({ allErrors: true })
/* #endregion */

/* #region addEmployee */
exports.addEmployee = (request, response) => {
  let responseBody = {}
  getRawBody(request)
    .then((bodyBuffer) => {
      const User = JSON.parse(bodyBuffer.toString())
      const header = {
        org: request.headers['org']
      }
      employeee = { ...header, ...User }
      // console.log(employeee)
      let responseBody = {}

      const valid = ajv.validate(schema.addEmployee, employeee)
      const validatonError = ajv.errors
      if (valid) {
        result = mongod.addEmployee(employeee)
        result.then(result => {
          responseBody = {
            status: 'ok',
            result: result[0].value.ops[0]
          }
          // console.log(result)
          ok(response, responseBody)
        }).catch(err => {
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
/* #endregion */

/* #region getEmployee */
exports.getEmployee = (request, response, params) => {
  let responseBody = {}
  const valid = ajv.validate(schema.getEmployee, params)
  const validatonError = ajv.errors
  if (valid) {
    result = mongod.getEmployee(params.id)
      .then(result => {
        responseBody = {
          status: 'ok',
          result: result
        }
        ok(response, responseBody)
      })
      .catch(err => {
        responseBody = {
          status: 'error',
          message: 'id does not exist in database'
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
}
/* #endregion */

/* #region updateEmployee */
exports.updateEmployee = (request, response) => {
  let responseBody = {}
  getRawBody(request)
    .then((bodyBuffer) => {
      const User = JSON.parse(bodyBuffer.toString())
      const header = {
        org: request.headers['org']
      }
      employeee = { ...header, ...User }
      let responseBody = {}
      // console.log(employeee)
      const valid = ajv.validate(schema.updateEmployee, employeee)
      const validatonError = ajv.errors
      if (valid) {
        mongod.updateEmployee(employeee)
          .then(result => {
            responseBody = {
              status: 'ok',
              message: 'the date was updated',
              // result: result
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
/* #endregion */


/* #region getAllEmployee */
exports.getAllEmployee = (request, response) => {
  const requestUrl = url.parse(request.url)
  const params = querystring.decode(requestUrl.query)
  const header = {
    org: request.headers['org']
  }

  let responseBody = {}
  const valid = ajv.validate(schema.getAllEmployee, params)
  const validatonError = ajv.errors
  if (valid) {
    mongod.getAllEmployee(header)
      .then((result) => {
        responseBody = {
          status: 'ok',
          result: result
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
}
/* #endregion */
