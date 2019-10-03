/* #region variable */
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect
const {
  server
} = require('../app/server')

let employee
/* #endregion */

/* #region Test */
describe('Library Integration Test', () => {
  /* #region addEmployee */
  describe('addEmployee Test', () => {
    it('It should added successfully', (done) => {
      const testEmployee = {
        id: 12,
        data: {
          name: 'milad',
          lastname: 'mokhtari'
        },
        parent: 3
      }
      chai.request(server)
        .post('/dataService')
        .set('org', 'partSoftwareGroup')
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
  /* #endregion */

/* #region getEmployee */
  describe('getEmployee Test', () => {
    it('It should  getEmployee by id', (done) => {
      chai.request(server)
        .get('/dataService/' + employee._id)
        .set('org', employee.org)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            expect(result.body.status).to.equal('ok')
            done()
          }
        })
    })
  })
  /* #endregion */

/* #region updateEmployee */
  describe('updateEmployee Test', () => {
    it('It should update employee', (done) => {
      const testEmployee = {
        id: employee._id,
        data: employee.data,
        parent: 4
      }
      chai.request(server)
        .put('/dataService')
        .set('org', employee.org)
        .send(testEmployee)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            expect(result.body.status).to.equal('ok')
            done()
          }
        })
    })

    it('It should NOT update employee - body is NOT exist', (done) => {
      chai.request(server)
        .put('/dataService')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body.status).to.equal('error')
            done()
          }
        })
    })
  })
  /* #endregion */
})
/* #endregion */
