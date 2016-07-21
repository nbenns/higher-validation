'use strict';

const Validation = require('data.validation');
const HVAny = require('../../lib/Any');
require('chai').should();

const value = 'test';

describe('Any', () => {

  describe('returns success when called with a value', () => {
    const result = HVAny(value);

    it('is a Validation Object', () => result.should.be.instanceof(Validation));
    it('is Successful', () => result.isSuccess.should.be.true);
    it('has original value', () => result.value.should.equal(value));
  });

});
