'use strict';

const Validation = require('data.validation');
const HVLength = require('../../lib/Length');
require('chai').should();

const Failure = Validation.Failure;
const Success = Validation.Success;

const typeError = 'Invalid';
const validType = Success;
const invalidType = () => Failure([typeError]);
const min = 2;
const max = 3;
const validValue = 'abc';
const invalidValue = 4;
const shortValue = 'a';
const longValue = 'abcd';
const errString = `Length not in range ${min} -> ${max}`;

describe('Length', () => {

  describe('returns success when called with a value in the length range', () => {
    const result = HVLength(min, max, validType, validValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has original value', () => result.value.should.equal(validValue));
  });

  describe('returns failed when called with an invalid Value', () => {
    const result = HVLength(min, max, validType, invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with a value greater then the length', () => {
    const result = HVLength(min, max, validType, longValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with a value less then the length', () => {
    const result = HVLength(min, max, validType, shortValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with a value of incorrect type', () => {
    const result = HVLength(min, max, invalidType, validValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

});
