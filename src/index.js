/*jshint node:true */

'use strict';

var unsupported = require('unsupported')();
var isUndefined = require('lodash.isundefined');

module.exports = function binaryOpExtender(Decimal, opName, protoName) {
  var adapter = Decimal.getAdapter();
  var implementation = unsupported;
  var name = isUndefined(protoName) ? opName : protoName;

  if (adapter.hasOwnProperty(opName)) {
    implementation = function(x) {
      return new Decimal(adapter.toString(adapter[opName](this.val(), x.val())));
    };
  }

  Decimal.prototype[name] = implementation;

  return Decimal;
};
