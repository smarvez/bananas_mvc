const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('Bananas Resources', function () {
  describe('POST /', function () {
    it('should create a banana', function (done) {
      const banana = { name: 'Wilfred', size: 'extra large', flavor: 'earthy' }
      chai.request(app)
        .post('/bananas')
        .send(banana)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.name).to.equal(banana.name)
          expect(res.body.data.breed).to.equal(banana.breed)
          done()
        })
    })

    it('should return an error if name is missing', function (done) {
      const banana = { size: 'extra large' }
      chai.request(app)
        .post('/bananas')
        .send(banana)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if breed is missing', function (done) {
      const banana = { name: 'Wilfred' }
      chai.request(app)
        .post('/bananas')
        .send(banana)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('GET /', function () {
    it('should retrieve a list of all the bananas', function (done) {
      chai.request(app)
        .get('/bananas')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const banana = res.body.data[0]
          expect(banana).to.be.an('object')
          expect(banana.id).to.be.ok
          done()
        })
    })
  })

  describe('GET /:id', function () {
    it('should retrieve the single banana specified', function (done) {
      chai.request(app)
        .get('/bananas')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const banana = res.body.data[0]
          chai.request(app)
            .get(`/bananas/${banana.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')

              expect(res.body.data.id).to.equal(banana.id)
              done()
            })
        })
    })

    it('should return an error if the id does not match a banana', function (done) {
      chai.request(app)
        .get('/bananas/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('PUT /:id', function () {
    it('should update an existing banana when all information is provided', function (done) {
      chai.request(app)
        .get('/bananas')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const banana = res.body.data[0]
          const newInfo = { name: 'Willy', size: 'miniature', flavor: 'savory' }
          chai.request(app)
            .put(`/bananas/${banana.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.id).to.be.ok
              expect(res.body.data.name).to.equal(newInfo.name)
              expect(res.body.data.breed).to.equal(newInfo.breed)
              done()
            })
        })

    })

    it('should return an error if name is missing', function (done) {
      chai.request(app)
        .get('/bananas')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const banana = res.body.data[0]
          const newInfo = { size: 'miniature' }
          chai.request(app)
            .put(`/bananas/${banana.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if breed is missing', function (done) {
      chai.request(app)
        .get('/bananas')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const banana = res.body.data[0]
          const newInfo = { name: 'Willy' }
          chai.request(app)
            .put(`/bananas/${banana.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
  })

  describe('DELETE /:id', function () {
    it('should remove the specified banana', function (done) {
      chai.request(app)
        .get('/bananas')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const banana = res.body.data[0]
          chai.request(app)
            .delete(`/bananas/${banana.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(204)
              chai.request(app)
                .get(`/bananas/${banana.id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(404)
                  done()
                })
            })
        })
    })

    it('should return an error if the id is not found', function (done) {
      chai.request(app)
        .delete('/bananas/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})
