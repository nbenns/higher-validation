'use strict';

const Validation = require('data.validation');
const HVBoolean = require('../../lib/Boolean');
require('chai').should();

const valid = true;
const invalid = 'abc';

const errString = 'Not a valid Boolean';

describe('Boolean', () => {

  describe('returns success when called with an boolean', () => {
    const result = HVBoolean(valid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has value that is converted', () => result.value.should.equal(valid));
  });

  describe('returns failed when called with a non-boolean', () => {
    const result = HVBoolean(invalid);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with null', () => {
    const result = HVBoolean(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([errString]));
  });

  describe('returns failed when called with undefined', () => {
    const result = HVBoolean();

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([errString]));
  });

});
