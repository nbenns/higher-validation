'use strict';

const Validation = require('data.validation');
const HVNumber = require('../../lib/Number');
require('chai').should();

const convertsInt = '2';
const convertsFloat = '2.2';
const doesntConvert = 'abc';

describe('Number', () => {

  describe('returns success with the converted number when called with an integer convertable string', () => {
    const result = HVNumber(convertsInt);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has value that is converted', () => result.value.should.equal(2));
  });

  describe('returns success with the converted number when called with a float convertable string', () => {
    const result = HVNumber(convertsFloat);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has value that is converted', () => result.value.should.equal(2.2));
  });

  describe('returns failed with an error message when called with a non-convertable string', () => {
    const result = HVNumber(doesntConvert);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql(['Not a valid Number']));
  });

  describe('returns failed with an error message when called with null', () => {
    const result = HVNumber(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql(['Not a valid Number']));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = HVNumber();

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql(['Not a valid Number']));
  });

});
