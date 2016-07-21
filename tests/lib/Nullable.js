'use strict';

const Validation = require('data.validation');
const HVNullable = require('../../lib/Nullable');
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').should();

const Failure = Validation.Failure;

const validValue = null;
const invalidValue = undefined;
const errString = 'Not valid';
const fail = () => Failure([errString]);

describe('Nullable', () => {

  describe('returns success when called with a null value', () => {
    const type = sinon.spy(fail);
    const result = HVNullable(type, validValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has original value', () => expect(result.value).to.equal(validValue));
    it('did not call type function', () => type.called.should.be.false);
  });

  describe('returns failed with an error message when called non null value', () => {
    const type = sinon.spy(fail);
    const result = HVNullable(type, invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
    it('called type function', () => type.calledOnce.should.be.true);
    it('called type function with value', () => type.calledWith(invalidValue).should.be.true);
  });

});
