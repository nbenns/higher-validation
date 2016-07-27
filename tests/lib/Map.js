'use strict';

const sinon = require('sinon');
const HVMap = require('../../lib/Map');
require('chai').should();

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const value = {a: 2};
const notaMap = 2;
const typeError = 'failure';
const errString = 'Not a valid Map';
const invalidTypeError = 'Not a valid Type';
const valid = Success;
const invalid = () => Failure([typeError]);

describe('Map', () => {
  describe('returns failure when called with null input', () => {
    const keyType = sinon.spy(valid);
    const valueType = sinon.spy(valid);
    const result = HVMap(keyType, valueType, null);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value[0].should.equal(errString));
    it('doesn\'t execute key type function', () => keyType.called.should.be.false);
    it('doesn\'t execute value type function', () => valueType.called.should.be.false);
  });

  describe('returns failure when called with a non-Object', () => {
    const keyType = sinon.spy(valid);
    const valueType = sinon.spy(valid);
    const result = HVMap(keyType, valueType, notaMap);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value[0].should.equal(errString));
    it('doesn\'t execute key type function', () => keyType.called.should.be.false);
    it('doesn\'t execute value type function', () => valueType.called.should.be.false);
  });

  describe('returns Failure when called with an null key type function and an Object', () => {
    const keyType = null;
    const valueType = sinon.spy(valid);
    const result = HVMap(keyType, valueType, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value[0].should.equal(invalidTypeError));
    it('doesn\'t execute value type function', () => valueType.called.should.be.false);
  });

  describe('returns Failure when called with an null value type function and an Object', () => {
    const keyType = sinon.spy(valid);
    const valueType = null;
    const result = HVMap(keyType, valueType, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value[0].should.equal(invalidTypeError));
    it('doesn\'t execute key type function', () => keyType.called.should.be.false);
  });

  describe('returns Failure when called with an invalid key type function and an Object', () => {
    const keyType = 2;
    const valueType = sinon.spy(valid);
    const result = HVMap(keyType, valueType, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value[0].should.equal(invalidTypeError));
    it('doesn\'t execute value type function', () => valueType.called.should.be.false);
  });

  describe('returns Failure when called with an invalid value type function and an Object', () => {
    const keyType = sinon.spy(valid);
    const valueType = 2;
    const result = HVMap(keyType, valueType, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value[0].should.equal(invalidTypeError));
    it('doesn\'t execute key type function', () => keyType.called.should.be.false);
  });

  describe('returns Success when called with type function and a valid Object', () => {
    const keyType = sinon.spy(valid);
    const valueType = sinon.spy(valid);
    const result = HVMap(keyType, valueType, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Success', () => result.isSuccess.should.be.true);
    it('contains original value', () => result.value.should.eql(value));
    it(
      'executes key type function for each value in Map',
      () => keyType.callCount.should.equal(Object.keys(value).length)
    );
    it(
      'executes value type function for each value in Map',
      () => valueType.callCount.should.equal(Object.keys(value).length)
    );
  });

  describe('returns Failure when called with valid type functions and a invalid Key Type in Object', () => {
    const keyType = sinon.spy(invalid);
    const valueType = sinon.spy(valid);
    const result = HVMap(keyType, valueType, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value.should.eql([`index 0: Key: ${typeError}`]));
    it(
      'executes key type function for each value in Map',
      () => keyType.callCount.should.equal(Object.keys(value).length)
    );
    it(
      'executes value type function for each value in Map',
      () => valueType.callCount.should.equal(Object.keys(value).length)
    );
  });

  describe('returns Failure when called with valid type functions and a invalid Value Type in Object', () => {
    const keyType = sinon.spy(valid);
    const valueType = sinon.spy(invalid);
    const result = HVMap(keyType, valueType, value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is a Failure', () => result.isFailure.should.be.true);
    it('contains an Array', () => result.value.should.be.instanceof(Array));
    it('has Array which contains correct String', () => result.value.should.eql([`index 0: Value: ${typeError}`]));
    it(
      'executes key type function for each value in Map',
      () => keyType.callCount.should.equal(Object.keys(value).length)
    );
    it(
      'executes value type function for each value in Map',
      () => valueType.callCount.should.equal(Object.keys(value).length)
    );
  });
});

