'use strict';

const Validation = require('data.validation');
const HVMatch = require('../../lib/Match');
require('chai').should();

const Failure = Validation.Failure;
const Success = Validation.Success;

const typeError = 'Invalid';
const validType = Success;
const invalidType = () => Failure([typeError]);
const pattern = /^abc$/;
const validValue = 'abc';
const invalidValue = 'bad';
const errString = `Value doesn't match ${pattern}`;

describe('Match', () => {

  describe('returns success when called with a value matching the pattern', () => {
    const result = HVMatch(validType, pattern, validValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has original value', () => result.value.should.equal(validValue));
  });

  describe('returns failed when called with a value outside the range', () => {
    const result = HVMatch(validType, pattern, invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with a value of incorrect type', () => {
    const result = HVMatch(invalidType, pattern, invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

});
