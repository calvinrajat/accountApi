/*******************************************************************************
 * @file unit test cases for customers.js file,
 * @author Sapient
 ******************************************************************************/
'use strict';
var chai = require('chai');
var expect = chai.assert;
var app = require('../server/server');
var supertest = require('supertest');
var api = supertest('http://localhost:3000');


var negativeResponse={
  "message": "transaction Id invalid",
  "errorCode": "ACT111",
  "statusCode": "400"
};


describe('Transaction model', function () {

  it('get transactions', function (done) {
    api.get('/api/transactions/fetchData?data=1')
      .set('Accept', 'application/json')
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        expect.isNotEmpty(res);
        done();
      });
  });

  it('get transactions negative ', function (done) {
    api.get('/api/transactions/fetchData?data=3333')
      .set('Accept', 'application/json')
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        console.log("err.body", err);
        console.log("res.body", res.body);
        expect.isEmpty(res.body) ;
        done();
      });
  });

});

