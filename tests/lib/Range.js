'use strict';

const Validation = require('data.validation');
const HVRange = require('../../lib/Range');
require('chai').should();

const Failure = Validation.Failure;
const Success = Validation.Success;

const typeError = 'Invalid';
const validType = Success;
const invalidType = () => Failure([typeError]);
const start = 1;
const end = 3;
const validValue = 2;
const invalidValue = 4;
const errString = `Not in Range ${start} -> ${end}`;

describe('Range', () => {

  describe('returns success when called with a value in the range', () => {
    const result = HVRange(start, end, validType, validValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has original value', () => result.value.should.equal(validValue));
  });

  describe('returns failed when called with a value outside the range', () => {
    const result = HVRange(start, end, validType, invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with a value of incorrect type', () => {
    const result = HVRange(start, end, invalidType, validValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([typeError]));
  });

});
