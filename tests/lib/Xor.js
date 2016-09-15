'use strict';

const Validation = require('data.validation');
const {Success, Failure} = Validation;
const Xor = require('../../lib/Xor');

require('chai').should();

const valid = Success;
const failureString = 'Not a valid Xor Type';
const invalid = () => Failure([failureString]);

const testVal = true;
const lengthError = 'Value doesn\'t match /^[0-9]*$/';

describe('Xor', () => {

  describe('returns Success when called with a valid value of first type', () => {
    const result = Xor(valid, invalid)(testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(testVal));
  });

  describe('returns Success when called with a valid value of second type', () => {
    const result = Xor(invalid, valid)(testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(testVal));
  });

  describe('returns Failure when called with a value invalid for either type', () => {
    const result = Xor(invalid, invalid)(testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([failureString]));
  });

  describe('returns Failure when called with a value valid for both types', () => {
    const result = Xor(valid, valid)(testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([failureString]));
  });

  describe('returns failed with an error message when called with null', () => {
    const result = Xor(valid, valid)(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([failureString]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = Xor(valid, valid)(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([failureString]));
  });
});

