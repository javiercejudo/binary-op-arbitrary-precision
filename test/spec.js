/*jshint node:true, mocha:true */

'use strict';

require('should');

var adapter = require('floating-adapter');
var Decimal = require('core-arbitrary-precision')(adapter);
var binaryOpExtender = require('../src/');

describe('plus', function() {
  it('should add a given number', function() {
    binaryOpExtender(Decimal, 'plus');
    binaryOpExtender(Decimal, 'plus', '+');
    binaryOpExtender(Decimal, 'div');

    new Decimal('2').plus(new Decimal('3')).toString().should.be.exactly('5');
    new Decimal('2')['+'](new Decimal('3')).toString().should.be.exactly('5');

    new Decimal('1').div(new Decimal('2')).toString().should.be.exactly('0.5');
  });

  it('should throw when the given method does not exist', function() {
    binaryOpExtender(Decimal, 'nonExistentMethod');

    (function() {
      new Decimal('2').nonExistentMethod(new Decimal('3'));
    }).should.throw('Unsupported operation');
  });
});
