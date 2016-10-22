'use strict';

const {split} = require('ramda');
const Validation = require('data.validation');
const {Success, Failure} = Validation;
const Join = require('../../lib/Join');

require('chai').should();

const valid = Success;
const failureString = 'Not a valid Join Type';
const firstTypeFailure = ['first: ' + failureString];
const secondTypeFailure = ['second: ' + failureString];
const bothTypeFailures = firstTypeFailure.concat(secondTypeFailure);
const invalid = () => Failure([failureString]);

const testVal = 'abc 123';
const splitFunc = split(' ');
const lengthError = 'Value doesn\'t match /^[0-9]*$/';

describe('Join', () => {

  describe('returns Success when the split type validates both values', () => {
    const result = Join(splitFunc, valid, valid)(testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(testVal));
  });

  describe('returns Failure when the first value in the split pair fails to validate', () => {
    const result = Join(splitFunc, invalid, valid)(testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql(firstTypeFailure));
  });

  describe('returns Failure when the second value in the split pair fails to validate', () => {
    const result = Join(splitFunc, valid, invalid)(testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql(secondTypeFailure));
  });

  describe('returns Failure when the first and second values in the split pair fails to validate', () => {
    const result = Join(splitFunc, invalid, invalid)(testVal);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql(bothTypeFailures));
  });

  describe('returns failed with an error message when called with null', () => {
    const result = Join(splitFunc, valid, valid)(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([failureString]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = Join(splitFunc, valid, valid)(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([failureString]));
  });
});

