'use strict';

const Validation = require('data.validation');
const HVOptional = require('../../lib/Optional');
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').should();

const Failure = Validation.Failure;

const validValue = undefined;
const invalidValue = null;
const errString = 'Not valid';
const fail = () => Failure([errString]);

describe('Optional', () => {

  describe('returns success when called with an undefined value', () => {
    const type = sinon.spy(fail);
    const result = HVOptional(type, validValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has original value', () => expect(result.value).to.equal(validValue));
    it('did not call type function', () => type.called.should.be.false);
  });

  describe('returns failed with an error message when called with a value', () => {
    const type = sinon.spy(fail);
    const result = HVOptional(type, invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
    it('called type function', () => type.calledOnce.should.be.true);
    it('called type function with value', () => type.calledWith(invalidValue).should.be.true);
  });

});
