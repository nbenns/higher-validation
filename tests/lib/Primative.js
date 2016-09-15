'use strict';

const Validation = require('data.validation');
const HVPrimative = require('../../lib/Primative');
require('chai').should();

const boolValid = true;
const intValid = 2;
const floatValid = 2.2;
const stringValid = 'abc';

const errString = 'Not a valid Xor Type';

describe('Primative', () => {
  describe('returns success when called with a boolean', () => {
    const result = HVPrimative(boolValid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has value that is converted', () => result.value.should.equal(boolValid));
  });

  describe('returns success when called with an integer', () => {
    const result = HVPrimative(intValid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has value that is converted', () => result.value.should.equal(intValid));
  });

  describe('returns success when called with a float', () => {
    const result = HVPrimative(floatValid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has value that is converted', () => result.value.should.equal(floatValid));
  });

  describe('returns success when called with a string', () => {
    const result = HVPrimative(stringValid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has value that is converted', () => result.value.should.equal(stringValid));
  });

  describe('returns failed when called with NaN', () => {
    const result = HVPrimative(NaN);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with an array', () => {
    const result = HVPrimative([]);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with an object', () => {
    const result = HVPrimative({});

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with null', () => {
    const result = HVPrimative(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with undefined', () => {
    const result = HVPrimative(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });
});
