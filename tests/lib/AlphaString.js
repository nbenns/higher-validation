'use strict';

const Validation = require('data.validation');
const AlphaString = require('../../lib/AlphaString');

require('chai').should();

const valid = 'Abc';
const invalidString = '123';
const invalidValue = 123;

const typeError = 'Not a valid String';
const lengthError = 'Value doesn\'t match /^[A-z]*$/';

describe('AlphaString', () => {

  describe('returns Success when called with a valid String', () => {
    const result = AlphaString(valid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(valid));
  });

  describe('returns Failure when called with a String that is invalid', () => {
    const result = AlphaString(invalidString);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([lengthError]));
  });

  describe('returns failed when called with a non-string', () => {
    const result = AlphaString(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

  describe('returns when called with null', () => {
    const result = AlphaString(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([typeError]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = AlphaString(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

});
