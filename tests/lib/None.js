'use strict';

const Validation = require('data.validation');
const HVNone = require('../../lib/None');
require('chai').should();

const value = 'test';
const errString = 'Not a valid None Type';

describe('None', () => {

  describe('returns failure when called with a value', () => {
    const result = HVNone(value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([errString]));
  });

});
