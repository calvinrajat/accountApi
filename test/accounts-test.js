/*******************************************************************************
 * @file unit test cases for customers.js file,
 * @author Sapient
 ******************************************************************************/
'use strict';
var chai = require('chai');
var expect = chai.assert;
var app = require('../server/server');
var supertest = require('supertest');
var api = supertest.agent('http://localhost:3000');


var negativeResponse= { message: 'No  Account found for account Number: 45',
  errorCode: 'ERROR',
  statusCode: '400'
};
describe('Accounts model', function () {

  var access_token;
  var credentials = {
    "email": "admin@sapient.com",
    "password":"sapient"
  };
  beforeEach('************Fetching acess token',function(done){
    api
      .post('/api/Users/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(credentials)
      .end(function (err, res) {
        access_token=res.body.id;
        done();
      });
  });

		it('get /accounts/fetchData positive', function (done) {
		api.get('/api/accounts/fetchData?data=1&sortCode=1')
			.set('Accept', 'application/json')
      .query({'access_token': access_token})
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				expect.isNotEmpty(res);
				done();
			});
	});

	it('get /Accounts/byAccountNumber negative', function (done) {
		api.get('/api/accounts/fetchData?data=45&sortCode=1')
			.set('Accept', 'application/json')
      .query({'access_token': access_token})
			.expect("Content-type", /json/)
			.end(function (err, res) {
				expect.deepEqual(res.body, negativeResponse, 'Response should match to expected');
				done();
				
			});
	});
});




