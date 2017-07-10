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


var negativeResponse= { message: 'No  Account found for account Number: 45',
  errorCode: 'ERROR',
  statusCode: '400'
};
describe('Accounts model', function () {

		it('get /accounts/fetchData positive', function (done) {
		api.get('/api/accounts/fetchData?data=1')
			.set('Accept', 'application/json')
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				expect.isNotEmpty(res);
				done();
			});
	});

	it('get /Accounts/byAccountNumber negative', function (done) {
		api.get('/api/accounts/fetchData?data=45')
			.set('Accept', 'application/json')
			.expect("Content-type", /json/)
			.end(function (err, res) {				
				//var responseJSON = JSON.parse(JSON.stringify(res.body));
				//var expJSONObj = JSON.parse(JSON.stringify(negativeResponse));
				//console.log(' responseJSON' , responseJSON) ;
				expect.deepEqual(res.body, negativeResponse, 'Response should match to expected');
				done();
				
			});
	});
});




