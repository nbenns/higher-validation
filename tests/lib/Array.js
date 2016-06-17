'use strict';

const sinon = require('sinon');
const HVArray = require('../../lib/Array');
require('chai').should();

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const value = [1];
const failureString = 'failure';
const valid = Success;
const invalid = () => Failure([failureString]);

describe('Array', () => {
  describe('returns failure when called with null input', () => {
    const spyValid = sinon.spy(valid);
    const result = HVArray(spyValid, null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value[0].should.equal('Not a valid Array'));
    it('doesn\'t execute type function', () => spyValid.called.should.be.false);
  });

  describe('returns Success when called with null type function and Array', () => {
    const result = HVArray(null, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains original value', () => result.value.should.eql(value));
  });

  describe('returns Success when called with non-function and Array', () => {
    const result = HVArray(2, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains original value', () => result.value.should.eql(value));
  });

  describe('returns Success when called with type function and a valid Array', () => {
    const spyValid = sinon.spy(valid);
    const result = HVArray(spyValid, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains original value', () => result.value.should.eql(value));
    it('executes type function for each value in Array', () => spyValid.callCount.should.equal(value.length));
  });

  describe('returns Failure when called with type function and a invalid Array', () => {
    const spyInvalid = sinon.spy(invalid);
    const result = HVArray(spyInvalid, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value.should.eql([`index 0: ${failureString}`]));
    it('executes type function for each value in Array', () => spyInvalid.callCount.should.equal(value.length));
  });
});

