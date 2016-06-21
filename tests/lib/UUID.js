'use strict';

const Validation = require('data.validation');
const uuid = require('uuid');
const HVUUID = require('../../lib/UUID');

require('chai').should();

const validUUID = uuid.v4();
const validString = 'test';
const invalidValue = 123;

const uuidErrString = 'Not a valid UUID';
const strErrString = 'Not a valid String';

describe('UUID', () => {

  describe('returns Success when called with a UUID', () => {
	  
    const result = HVUUID(validUUID);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains a the given value', () => result.value.should.eql(validUUID));
  });

  describe('returns Failure when called with a String that is not a UUID', () => {
    const result = HVUUID(validString);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([uuidErrString]));
  });

  describe('returns failed when called with a non-string', () => {
    const result = HVUUID(invalidValue);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([strErrString, uuidErrString]));
  });

  describe('returns when called with null', () => {
    const result = HVUUID(null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array that contains expected String', () => result.value.should.is.eql([strErrString, uuidErrString]));
  });

  describe('returns failed with an error message when called with undefined', () => {
    const result = HVUUID(undefined);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('has value that is an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains expected String', () => result.value.should.is.eql([strErrString, uuidErrString]));
  });

});
