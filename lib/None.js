'use strict';

const Type = require('./Type');

const isNone = Type((success, failure) => () => failure('Not a valid None Type'));

module.exports = isNone;

