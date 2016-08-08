'use strict';

const Validation = require('data.validation');
const NumericString = require('../../lib/NumericString');

require('chai').should();

const valid = '123';
const invalidString = 'Abc';
const invalidValue = 123;

const typeError = 'Not a valid String';
const lengthError = 'Value doesn\'t match /^[0-9]*$/';

describe('NumericString', () => {

  describe('returns Success when called with a valid String', () => {
    const result = NumericString(valid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(valid));
  });

  describe('returns Failure when called with a String that is invalid', () => {
    const result = NumericString(invalidString);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([lengthError]));
  });

  describe('returns failed when called with a non-string', () => {
    const result = NumericString(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

  describe('returns when called with null', () => {
    const result = NumericString(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([typeError]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = NumericString(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

});
