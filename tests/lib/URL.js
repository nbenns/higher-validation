'use strict';

const Validation = require('data.validation');
const HVURL = require('../../lib/URL');

require('chai').should();

const validURL = 'http://www.test.com/test';
const validString = 'test';
const invalidValue = 123;

const errString = 'Not a valid UUID';

describe('URL', () => {

  describe('returns Success when called with a URL', () => {
    const result = HVURL(validURL);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(validURL));
  });

  describe('returns Failure when called with a String that is not a URL', () => {
    const result = HVURL(validString);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with a non-string', () => {
    const result = HVURL(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns when called with null', () => {
    const result = HVURL(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = HVURL(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

});
