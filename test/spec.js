/*jshint node:true, mocha:true */

'use strict';

require('should');

var adapter = require('floating-adapter');
var Decimal = require('core-arbitrary-precision')(adapter);
var binaryOpExtender = require('../src/');

describe('plus', function() {
  it('should add a given number', function() {
    Decimal = binaryOpExtender(Decimal, 'plus');
    Decimal = binaryOpExtender(Decimal, 'plus', 'add');
    Decimal = binaryOpExtender(Decimal, 'div');

    new Decimal('2').plus(new Decimal('3')).toString().should.be.exactly('5');
    new Decimal('2').add(new Decimal('3')).toString().should.be.exactly('5');

    new Decimal('1').div(new Decimal('2')).toString().should.be.exactly('0.5');
  });

  it('should throw when the given method does not exist', function() {
    (function() {
      binaryOpExtender(Decimal, 'nonExistentMethod');
    }).should.throw('Unsupported operation');
  });
});
