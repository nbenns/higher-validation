'use strict';

const Validation = require('data.validation');
const HVString = require('../../lib/String');
require('chai').should();

const validValue = 'test';
const invalidValue = 123;

const errString = 'Not a valid String';

describe('String', () => {

  describe('returns success with a String when called with a String', () => {
    const result = HVString(validValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has value that is converted', () => result.value.should.equal(validValue));
  });

  describe('returns failed with an error message when called with a non-string', () => {
    const result = HVString(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed with an error message when called with null', () => {
    const result = HVString(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = HVString();

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

});
