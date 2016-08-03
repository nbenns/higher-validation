'use strict';

const HVString = require('./String.js');
const HVLength = require('./Length.js');

const NonEmptyString = HVLength(1, Infinity, HVString);

module.exports = NonEmptyString;

