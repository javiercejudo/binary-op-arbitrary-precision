/*jshint node:true */

'use strict';

module.exports = function binaryOpExtender(Decimal, opName, protoName) {
  Decimal.prototype[protoName || opName] = function(x) {
    return new Decimal(Decimal.getAdapter()[opName](this.val(), x.val()).toString());
  };

  return Decimal;
};
