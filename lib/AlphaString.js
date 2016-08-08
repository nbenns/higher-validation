'use strict';

const HVString = require('./String');
const HVMatch = require('./Match');

const AlphaString = HVMatch(/^[A-z]*$/, HVString);

module.exports = AlphaString;

