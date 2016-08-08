'use strict';

const Validation = require('data.validation');
const AlphaNumericString = require('../../lib/AlphaNumericString');

require('chai').should();

const valid = 'Abc123';
const invalidString = '!*@#';
const invalidValue = 123;

const typeError = 'Not a valid String';
const lengthError = 'Value doesn\'t match /^[A-z0-9]*$/';

describe('AlphaNumericString', () => {

  describe('returns Success when called with a valid String', () => {
    const result = AlphaNumericString(valid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(valid));
  });

  describe('returns Failure when called with a String that is invalid', () => {
    const result = AlphaNumericString(invalidString);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([lengthError]));
  });

  describe('returns failed when called with a non-string', () => {
    const result = AlphaNumericString(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

  describe('returns when called with null', () => {
    const result = AlphaNumericString(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([typeError]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = AlphaNumericString(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

});
