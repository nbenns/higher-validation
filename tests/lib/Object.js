'use strict';

const HVObject = require('../../lib/Object');
const sinon = require('sinon');
const expect = require('chai').expect;
require('chai').should();

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const property = 'test';
const value = 'test';
const failureString = 'failure';
const valid = Success;
const invalid = () => Failure([failureString]);

describe('Object', () => {
  describe('returns Failure if input is null', () => {
    const model = {};
    const result = HVObject(model, null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value.should.eql(['Not a valid Object']));
  });

  describe('returns Failure if input is not an Object', () => {
    const model = {};
    const result = HVObject(model, 2);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value[0].should.equal('Not a valid Object'));
  });

  describe('returns Success if type is valid', () => {
    const spyValid = sinon.spy(valid);

    const model = {
      [property]: spyValid
    };

    const result = HVObject(model, {[property]: value});

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains expected value for property', () => result.value.should.eql({[property]: value}));
    it('executes type function once', () => spyValid.calledOnce.should.be.true);
    it('calls type function with value', () => spyValid.calledWith(value).should.be.true);
  });

  describe('returns Failure if type is invalid', () => {
    const spyInvalid = sinon.spy(invalid);

    const model = {
      [property]: spyInvalid
    };

    const result = HVObject(model, {[property]: value});

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () =>
      result.value[0].should.equal(`${property}: ${failureString}`));
    it('executes type function once', () => spyInvalid.calledOnce.should.be.true);
    it('calls type function with value', () => spyInvalid.calledWith(value).should.be.true);
  });

  describe('returns Success with object with no property that is undefined', () => {
    const spyValid = sinon.spy(valid);

    const model = {
      [property]: spyValid
    };

    const result = HVObject(model, {});

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('doesn\'t contain value for property', () => expect(result.value[property]).is.eql(undefined));
    it('executes type function once', () => spyValid.calledOnce.should.be.true);
    it('calls type function with value', () => spyValid.calledWith(undefined).should.be.true);
  });
});

