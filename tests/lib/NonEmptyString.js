'use strict';

const Validation = require('data.validation');
const NonEmptyString = require('../../lib/NonEmptyString');

require('chai').should();

const valid = 'abc';
const invalidString = '';
const invalidValue = 123;

const typeError = 'Not a valid String';
const lengthError = 'Length not in range 1 -> Infinity';

describe('NonEmptyString', () => {

  describe('returns Success when called with a valid String', () => {
    const result = NonEmptyString(valid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(valid));
  });

  describe('returns Failure when called with a String that is an empty String', () => {
    const result = NonEmptyString(invalidString);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([lengthError]));
  });

  describe('returns failed when called with a non-string', () => {
    const result = NonEmptyString(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

  describe('returns when called with null', () => {
    const result = NonEmptyString(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([typeError]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = NonEmptyString(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

});
