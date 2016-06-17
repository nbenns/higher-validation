'use strict';

const HVObject = require('../../lib/Object');
const sinon = require('sinon');
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
  describe('Model behaviour', () => {
    describe('returns Success with empty object if model is not an Object', () => {
      const model = null;

      const result = HVObject(model, {});

      it('is a Validation Object', () => result.should.be.instanceof(Validation));
      it('is a Success', () => result.isSuccess.should.be.true);
      it('contains empty Object', () => result.value.should.be.eql({}));
    });

    describe('returns Success with empty object if model is empty', () => {
      const model = {
      };

      const result = HVObject(model, {});

      it('is a Validation Object', () => result.should.be.instanceof(Validation));
      it('is a Success', () => result.isSuccess.should.be.true);
      it('contains empty Object', () => result.value.should.be.eql({}));
    });

    describe('returns Success with property from model in output', () => {
      const model = {
        [property]: {}
      };

      const result = HVObject(model, {});

      it('is a Validation Object', () => result.should.be.instanceof(Validation));
      it('is a Success', () => result.isSuccess.should.be.true);
      it('contains property from model', () => Object.keys(result.value).should.contain(property));
    });
  });

  describe('Input behaviour', () => {
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
  });

  describe('isRequired behaviour', () => {
    describe('returns a Failure if a parameter is required and not in the input', () => {
      const model = {
        [property]: {isRequired: true}
      };

      const result = HVObject(model, {});

      it('is a Validation Object', () => result.should.be.instanceof(Validation));
      it('is a Failure', () => result.isFailure.should.be.true);
      it('contains an Array', () => result.value.should.be.instanceof(Array));
      it('has Array which contains correct String', () =>
        result.value[0].should.equal(`${property}: Required but not provided`));
    });

    describe('returns Success if a parameter is not required and not in the input', () => {
      const model = {
        [property]: {isRequired: false}
      };

      const result = HVObject(model, {});

      it('is a Validation Object', () => result.should.be.instanceof(Validation));
      it('is a Success', () => result.isSuccess.should.be.true);
      it('contains null value for property', () => result.value.should.be.eql({[property]: null}));
    });

    describe('returns Success if a parameter if isRequired is not set and not in the input', () => {
      const model = {
        [property]: {}
      };

      const result = HVObject(model, {});

      it('is a Validation Object', () => result.should.be.instanceof(Validation));
      it('is a Success', () => result.isSuccess.should.be.true);
      it('contains null value for property', () => result.value.should.be.eql({[property]: null}));
    });

    describe('returns Success if a parameter is required and is in the input', () => {
      const model = {
        [property]: {isRequired: true}
      };

      const result = HVObject(model, {[property]: value});

      it('is a Validation Object', () => result.should.be.instanceof(Validation));
      it('is a Success', () => result.isSuccess.should.be.true);
      it('contains value for property', () => result.value.should.be.eql({[property]: value}));
    });
  });

  describe('Type behaviour', () => {
    describe('returns Success if type is valid', () => {
      const spyValid = sinon.spy(valid);

      const model = {
        [property]: {type: spyValid}
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
        [property]: {type: spyInvalid}
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
  });
});

