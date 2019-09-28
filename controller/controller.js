/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const url = require('url')
const querystring = require('querystring')
const mongod = require('../mongodb/mongodb')
const Ajv = require('ajv')
const getRawBody = require('raw-body')
var Q = require('q')
var deferred = Q.defer()
const {
  ok, error
} = require('../util/response')


const schema = require('../schema/schema')

const ajv = new Ajv({
  allErrors: true
})
exports.addUser = (request, response) => {
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

      const valid = ajv.validate(schema.addUser, employeee)
      const validatonError = ajv.errors
      if (valid) {
        result = mongod.addUser(employeee)
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

exports.getUsers = (request, response) => {
  const requestUrl = url.parse(request.url)
  const params = querystring.decode(requestUrl.query)
  let responseBody = {}
  const valid = ajv.validate(schema.getUsers, params)
  const validatonError = ajv.errors
  if (valid) {
    result = mongod.getUsers()
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

exports.updateUser = (request, response) => {
  let responseBody = {}
  getRawBody(request)
    .then((bodyBuffer) => {
      const User = JSON.parse(bodyBuffer.toString())
      let responseBody = {}

      const valid = ajv.validate(schema.updateuser, User)
      const validatonError = ajv.errors
      if (valid) {
        mongod.updateUser(User)
        console.log(typeof mongod.updateUser(User)
        )
          .then((result) => {
            responseBody = {
              status: 'ok',
              result: result.ops[0]
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