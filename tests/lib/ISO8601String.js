'use strict';

const Validation = require('data.validation');
const HVISO8601String = require('../../lib/ISO8601String');

require('chai').should();

const valid = '2016-08-02T17:31:05+00:00';
const invalidString = 'test';
const invalidValue = 123;

const errString = 'Not a valid ISO8601 String';

describe('ISO8601String', () => {

  describe('returns Success when called with a valid ISO Date', () => {
    const result = HVISO8601String(valid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(valid));
  });

  describe('returns Failure when called with a String that is not a valid ISO Date', () => {
    const result = HVISO8601String(invalidString);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with a non-string', () => {
    const result = HVISO8601String(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns when called with null', () => {
    const result = HVISO8601String(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = HVISO8601String(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

});
