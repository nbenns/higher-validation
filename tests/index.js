'use strict';

const HV = require('../index');
require('chai').should();

describe('Index', () => {
  describe('Exports Any', () => {
    it('has a property called Any', () => Object.keys(HV).should.contains('Any'));
    it('has a property Any that is a Function', () => HV.Any.should.be.instanceof(Function));
  });

  describe('Exports None', () => {
    it('has a property called None', () => Object.keys(HV).should.contains('None'));
    it('has a property None that is a Function', () => HV.None.should.be.instanceof(Function));
  });

  describe('Exports Object', () => {
    it('has a property called Object', () => Object.keys(HV).should.contains('Object'));
    it('has a property Object that is a Function', () => HV.Object.should.be.instanceof(Function));
  });

  describe('Exports Array', () => {
    it('has a property called Array', () => Object.keys(HV).should.contains('Array'));
    it('has a property Array that is a Function', () => HV.Array.should.be.instanceof(Function));
  });

  describe('Exports Map', () => {
    it('has a property called Map', () => Object.keys(HV).should.contains('Map'));
    it('has a property Map that is a Function', () => HV.Map.should.be.instanceof(Function));
  });

  describe('Exports Boolean', () => {
    it('has a property called Boolean', () => Object.keys(HV).should.contains('Boolean'));
    it('has a property Boolean that is a Function', () => HV.Boolean.should.be.instanceof(Function));
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

  describe('Exports URL', () => {
    it('has a property called URL', () => Object.keys(HV).should.contains('URL'));
    it('has a property URL that is a Function', () => HV.URL.should.be.instanceof(Function));
  });

  describe('Exports Email', () => {
    it('has a property called Email', () => Object.keys(HV).should.contains('Email'));
    it('has a property Email that is a Function', () => HV.Email.should.be.instanceof(Function));
  });

  describe('Exports ISO8601String', () => {
    it('has a property called ISO8601String', () => Object.keys(HV).should.contains('ISO8601String'));
    it('has a property ISO8601String that is a Function', () => HV.ISO8601String.should.be.instanceof(Function));
  });

  describe('Exports Type', () => {
    it('has a property called Type', () => Object.keys(HV).should.contains('Type'));
    it('has a property Type that is a Function', () => HV.Type.should.be.instanceof(Function));
  });

  describe('Exports Nullable', () => {
    it('has a property called Nullable', () => Object.keys(HV).should.contains('Nullable'));
    it('has a property Nullable that is a Function', () => HV.Nullable.should.be.instanceof(Function));
  });

  describe('Exports Optional', () => {
    it('has a property called Optional', () => Object.keys(HV).should.contains('Optional'));
    it('has a property Optional that is a Function', () => HV.Optional.should.be.instanceof(Function));
  });

  describe('Exports Range', () => {
    it('has a property called Range', () => Object.keys(HV).should.contains('Range'));
    it('has a property Range that is a Function', () => HV.Range.should.be.instanceof(Function));
  });

  describe('Exports Match', () => {
    it('has a property called Match', () => Object.keys(HV).should.contains('Match'));
    it('has a property Match that is a Function', () => HV.Match.should.be.instanceof(Function));
  });

  describe('Exports Length', () => {
    it('has a property called Length', () => Object.keys(HV).should.contains('Length'));
    it('has a property Length that is a Function', () => HV.Length.should.be.instanceof(Function));
  });

  describe('Exports Xor', () => {
    it('has a property called Xor', () => Object.keys(HV).should.contains('Xor'));
    it('has a property Xor that is a Function', () => HV.Xor.should.be.instanceof(Function));
  });
});

