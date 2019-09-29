const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect

const {
    server
  } = require('../server')
  

describe('Library Integration Test', () => {
    describe('addEmployee Test', () => {
        it('It should added successfully', (done) => {
            const employee = {
                id: 1,
                dtat: {
                    name: 'masoud',
                    lastname: 'mokhtari'
                },
                parent: 2,
                org: '3'
              }
              chai.request(server)
              .post('/dataService')
              .send(employee)
              .end((error, result) => {
                if (error) {
                  done(error)
                } else {
                  expect(result).to.have.any.keys('statusCode')
                  expect(result.statusCode).to.equal(200)
                  expect(result).to.have.any.keys('body')
                  expect(result.body).to.have.any.keys('status')
                  expect(result.body.status).to.equal('ok')
                  user = result.body.result
                  done()
                }
              })
        })
    })
})

