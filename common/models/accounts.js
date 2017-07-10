'use strict';

var Promise = require('bluebird');
var loopback = require('loopback');
module.exports = function(Accounts) {

  /**
   * @function postAccount - This is a method which add accounts data
   * @param {Object} data - This is account information
   * @param {function} cb - requestCallback
   */
  Accounts.postAccount = (data,callback) => {
    let postAccountinfo = Promise.promisify(Accounts.create, {context: Accounts});
    postAccountinfo(data).then((successMessage) => {
      callback(null, successMessage) ;
    });
  };

  /**
   * Call remote method of postAccount
   * @type {Object}
   */
  Accounts.remoteMethod('postAccount', {
    accepts: { arg: 'data', type: 'Accounts', http: { source: 'body' } },
    returns: { arg: 'response', type: 'Accounts', root: true },
    http: { path: '/postData', verb: 'post' }
  });


  /**
   * @function getAccount - This is a method which retrieves accounts data
   * @param {Object} data - This is account information
   * @param {function} cb - requestCallback
   */
  Accounts.getAccount = (accountNumber,sortCode,callback) => {
    Accounts.validatesPresenceOf('accountNumber',{message: 'Cannot be blank'});
    let getAccountinfo = Promise.promisify(Accounts.find, {context: Accounts});
    let  getTransactioninfo= Promise.promisify(loopback.getModel('transaction').getTransaction, {context: loopback.getModel('transaction')});
    let  getThirdPartyinfo= Promise.promisify(loopback.getModel('thirdParty').getLocation, {context: loopback.getModel('thirdParty')});
    let resObject = {};
    getAccountinfo({where: {accountNumber: accountNumber}}).then((account) => {
    if (account.length === 0) {
      return Promise.reject({
        message: 'No  Account found for account Number: ' + accountNumber,
        errorCode: 'ERROR', statusCode: '400'
      });
    }
      resObject.accountInfo = account;
      getTransactioninfo(accountNumber).then((transaction) => {
      if (transaction.length === 0){
        return Promise.reject({
          message: 'No  transaction found for given account Number: ' + accountNumber,
          errorCode: 'ERROR', statusCode: '400'
        });
      }
        resObject.transactionInfo = transaction;
        getThirdPartyinfo('1600 Amphitheatre Parkway', 'Mountain View', 'CA').then((thirdPartyResponse) => {
          resObject.getThirdPartyinfo = thirdPartyResponse;
        callback(null, resObject);
      });
      });
  }).catch(function (error) {
      callback(null, error);
    });
  };

  /**
   * Call remote method of getAccount by a specific account number
   * @type {Array}
   */
  Accounts.remoteMethod('getAccount', {
    accepts: [{ arg: 'data', type: 'string', required: true, http: { source: 'query' }},
      { arg: 'sortCode', type: 'string', required: true, http: { source: 'query' }}],
    returns: { arg: 'response', type: 'object', root: true },
    http: { path: '/fetchData', verb: 'get' }
  });
};

