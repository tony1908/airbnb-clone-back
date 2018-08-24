const expect = require('chai').expect;
const request = require('supertest');
const should = require('should');
const http = require('should-http');
const Users = require('../../db/models/users');
const app = require('../../app');

describe('users signup' , () => {

    before((done) => {
        Users.remove({}, () => {
            done();
        })
    })

    after((done) => {
        Users.remove({}, () => {
            done();
        })
    })

    it('should signup user using email and password', (done) => {
        request(app)
            .post('/users/signup')
            .send({
                "user": {
                    "email": "emailail.com",
                    "password": "jnvjdnvdndeive"
                }
            })
            .expect("Content-type", /json/)
            .end((err, res) => {
                res.should.be.json();
                res.should.have.status(200);
                res.body.should.have.property('token');
                done();
            })
    })
})