'use strict';

const Validation = require('data.validation');
const HVAny = require('../../lib/Any');
require('chai').should();

const value = 'test';
const errString = 'Any type is required';

describe('Any', () => {

  describe('returns success when called with a value', () => {
    const result = HVAny(value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has original value', () => result.value.should.equal(value));
  });

  describe('returns failed when undefined', () => {
    const result = HVAny(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

});
