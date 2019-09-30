const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect

const {
  server
} = require('../server')

let employee
describe('Library Integration Test', () => {
  describe('addEmployee Test', () => {
    it('It should added successfully', (done) => {
      const testEmployee = {
        id: 13,
        data: {
          name: 'saeed',
          lastname: 'kazemi'
        },
        parent: 2
      }
      chai.request(server)
        .post('/dataService')
        .set('org', '2')
        .send(testEmployee)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('status')
            expect(result.body.status).to.equal('ok')
            employee = result.body.result
            done()
          }
        })
    })
    it('It should NOT addEmployee - not standard data', (done) => {
      const userWithWrongData = {
        id: 5,
        data: 'WRONG DATA',
        parent: 2
      }
      chai.request(server)
        .post('/dataService')
        .send(userWithWrongData)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.all.keys('status', 'message')
            expect(result.body.status).to.equal('error')
            done()
          }
        })
    })
    it('It should NOT addEmployee - wrong parent', (done) => {
      const userWithWrongParent = {
        id: 5,
        data: {
          name: 'saeed',
          lastname: 'kazemi'
        },
        parent: '@@@@@'
      }
      chai.request(server)
        .post('/dataService')
        .send(userWithWrongParent)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.all.keys('status', 'message')
            expect(result.body.status).to.equal('error')
            done()
          }
        })
    })
    it('It should NOT addEmployee - body is empty ', (done) => {

      chai.request(server)
        .post('/dataService')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.all.keys('status', 'message')
            expect(result.body.status).to.equal('error')
            done()
          }
        })
    })
  })


})

