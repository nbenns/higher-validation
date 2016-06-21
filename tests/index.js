'use strict';

const HV = require('../index');
require('chai').should();

describe('Index', () => {

  describe('Exports Object', () => {
    it('has a property called Object', () => Object.keys(HV).should.contains('Object'));
    it('has a property Object that is a Function', () => HV.Object.should.be.instanceof(Function));
  });

  describe('Exports Array', () => {
    it('has a property called Array', () => Object.keys(HV).should.contains('Array'));
    it('has a property Array that is a Function', () => HV.Array.should.be.instanceof(Function));
  });

  describe('Exports Number', () => {
    it('has a property called Number', () => Object.keys(HV).should.contains('Number'));
    it('has a property Number that is a Function', () => HV.Number.should.be.instanceof(Function));
  });

  describe('Exports String', () => {
    it('has a property called String', () => Object.keys(HV).should.contains('String'));
    it('has a property String that is a Function', () => HV.String.should.be.instanceof(Function));
  });

  describe('Exports UUID', () => {
    it('has a property called UUID', () => Object.keys(HV).should.contains('UUID'));
    it('has a property UUID that is a Function', () => HV.UUID.should.be.instanceof(Function));
  });

  describe('Exports Type', () => {
    it('has a property called Type', () => Object.keys(HV).should.contains('Type'));
    it('has a property Type that is a Function', () => HV.Type.should.be.instanceof(Function));
  });

});
