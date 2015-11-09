/*jshint node:true */

'use strict';

var assert = require('assert-error');

module.exports = function binaryOpExtender(Decimal, opName, protoName) {
  var adapter = Decimal.getAdapter();

  var implementation = function() {
    throw new Error('Unsupported operation');
  };

  if (adapter.hasOwnProperty(opName)) {
    implementation = function(x) {
      return new Decimal(adapter.toString(adapter[opName](this.val(), x.val())));
    };
  }

  Decimal.prototype[protoName || opName] = implementation;

  return Decimal;
};
