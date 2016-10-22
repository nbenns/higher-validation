'use strict';

const Validation = require('data.validation');
const {Success, Failure} = Validation;
const HVTuple = require('../../lib/Tuple');

require('chai').should();

const valid = Success;
const typeFailure = 'Not a valid Tuple';
const paramFailure = 'Not valid';
const typeInvalid = () => Failure([typeFailure]);
const paramInvalid = () => Failure([paramFailure]);
const testVal = ['a', 1];

const inSetVal = 1;
const nonSetVal = true;

describe('Tuple', () => {

  describe('returns Success when called with an pair of values which match the associated types', () => {
    const result = HVTuple(valid, valid, testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains the given value', () => result.value.should.eql(testVal));
  });

  describe('returns Failure when called with a value that is not valid for the first type', () => {
    const result = HVTuple(paramInvalid, valid, testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([`first: ${paramFailure}`]));
  });

  describe('returns Failure when called with a value that is not valid for the second type', () => {
    const result = HVTuple(valid, paramInvalid, testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([`second: ${paramFailure}`]));
  });

  describe('returns Failure when called with a null value', () => {
    const result = HVTuple(valid, valid, null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeFailure]));
  });

  describe('returns Failure when called with an undefined value', () => {
    const result = HVTuple(valid, valid, undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeFailure]));
  });

});

