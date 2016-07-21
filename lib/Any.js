'use strict';

const R = require('ramda');
const Type = require('./Type');

const id = R.identity;

const isAny = Type(id);

module.exports = isAny;

