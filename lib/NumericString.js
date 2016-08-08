'use strict';

const HVString = require('./String');
const HVMatch = require('./Match');

const NumericString = HVMatch(/^[0-9]*$/, HVString);

module.exports = NumericString;

