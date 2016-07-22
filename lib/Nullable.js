'use strict';

const Type = require('./Type');

const R = require('ramda');
const curry = R.curry;

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const isNullable = Type(success => curry((type, value) =>
  Just(value)
    .chain(v => v === null ? Nothing() : Just(v))
    .map(type)
    .getOrElse(success(null))
));

module.exports = isNullable;

