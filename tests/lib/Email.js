'use strict';

const Validation = require('data.validation');
const HVEmail = require('../../lib/Email');

require('chai').should();

const validEmail = 'test@test.com';
const validString = 'test';
const invalidValue = 123;

const errString = 'Not a valid Email';

describe('URL', () => {

  describe('returns Success when called with a URL', () => {
    const result = HVEmail(validEmail);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(validEmail));
  });

  describe('returns Failure when called with a String that is not a URL', () => {
    const result = HVEmail(validString);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with a non-string', () => {
    const result = HVEmail(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns when called with null', () => {
    const result = HVEmail(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = HVEmail(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

});
