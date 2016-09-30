'use strict';

const Validation = require('data.validation');
const {Success, Failure} = Validation;
const HVSet = require('../../lib/Set');

require('chai').should();

const valid = Success;
const failureString = 'Not a valid value in Set';
const invalid = () => Failure([failureString]);
const testSet = [1, 2];

const inSetVal = 1;
const nonSetVal = true;

describe('Set', () => {

  describe('returns Success when called with a value which matches the type and a set value', () => {
    const result = HVSet(testSet, valid, inSetVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(inSetVal));
  });

  describe('returns Failure when called with a value that is not valid for the type', () => {
    const result = HVSet(testSet, invalid, inSetVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([failureString]));
  });

  describe('returns Failure when called with a value that is a match in the set', () => {
    const result = HVSet(testSet, valid, nonSetVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([failureString]));
  });

});

