'use strict';
var Promise = require('bluebird');

module.exports = function(Transaction) {

  /**
   * @function postTransaction - This is a method that stores transaction data
   * @param {Object} data - This is transaction information
   * @param {function} cb - requestCallback
   */
  Transaction.postTransaction = (data,callback) => {
    let postTrannsactInfo = Promise.promisify( Transaction.create, {context: Transaction});
    postTrannsactInfo(data).then((successMessage) => {
      callback(null, successMessage) ;
  });
  };

  /**
   * Call remote method of postTransaction that stores transaction information
   * @type {object}
   */
  Transaction.remoteMethod('postTransaction', {
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object', root: true },
    http: { path: '/postData', verb: 'post' }
  });

  /**
   * @function getAccount - This is a method which retrieves transaction data
   * @param {Object} transactionId - This is transactionId information
   * @param {function} cb - requestCallback
   */
  Transaction.getTransaction = (transactionId,callback) => {
    var getTransactInfo = Promise.promisify(Transaction.find, {context: Transaction});
    getTransactInfo({where: {transactionId: transactionId}}).then((res) => {
      callback(null,res);
    });
  };


  /**
   * Call remote method of getTransaction by a specific transactionId
   * @type {string}
   */
  Transaction.remoteMethod('getTransaction', {
    accepts: [{
      arg: 'data',
      type: 'string',
      http: {source: 'query'}
    }],
    returns: [{ arg: 'data', type: 'object', root: true }],
    http: { path: '/fetchData', verb: 'get' }
  });
};
