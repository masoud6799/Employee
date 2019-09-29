/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongod = require('../mongodb/mongodb')
const Ajv = require('ajv')
const getRawBody = require('raw-body')
var Q = require('q')
const {
  ok, error
} = require('../util/response')

const schema = require('../schema/schema')

const ajv = new Ajv({
  allErrors: true
})
exports.addEmployee = (request, response) => {
  let responseBody = {}
  getRawBody(request)
    .then((bodyBuffer) => {
      const User = JSON.parse(bodyBuffer.toString())
      const header = {
        org: request.headers['org']
      }
      employeee = { ...header, ...User }
      console.log(employeee)
      let responseBody = {}

      const valid = ajv.validate(schema.addEmployee, employeee)
      const validatonError = ajv.errors
      if (valid) {
        result = mongod.addEmployee(employeee)
        result.then(result => {
          responseBody = {
            status: 'ok',
            result: result.ops
          }
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

exports.getEmployee = (request, response, params) => {
  let responseBody = {}
  const valid = ajv.validate(schema.getEmployee, params)
  const validatonError = ajv.errors
  if (valid) {
    result = mongod.getEmployee(parseInt(params.id))
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
      console.log(employeee)
      const valid = ajv.validate(schema.updateEmployee, employeee)
      const validatonError = ajv.errors
      if (valid) {
        mongod.updateEmployee(employeee)
          .then(result => {
            responseBody = {
              status: 'ok',
              message: 'The data was updated',
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