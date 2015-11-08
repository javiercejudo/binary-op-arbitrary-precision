/*jshint node:true */

'use strict';

var assert = require('assert-error');

module.exports = function binaryOpExtender(Decimal, opName, protoName) {
  var adapter = Decimal.getAdapter();

  assert(adapter.hasOwnProperty(opName), new Error('Unsupported operation'));

  Decimal.prototype[protoName || opName] = function(x) {
    return new Decimal(adapter.toString(adapter[opName](this.val(), x.val())));
  };

  return Decimal;
};
