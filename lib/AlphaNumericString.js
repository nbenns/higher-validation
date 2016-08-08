'use strict';

const HVString = require('./String');
const HVMatch = require('./Match');

const AlphaNumericString = HVMatch(/^[A-z0-9]*$/, HVString);

module.exports = AlphaNumericString;

