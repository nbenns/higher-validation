'use strict';

const Type = require('./Type');

const R = require('ramda');
const curry = R.curry;

const Maybe = require('data.Maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const isOptional = Type(success => curry((type, value) =>
  Just(value)
    .chain(v => v === undefined ? Nothing() : Just(v))
    .map(type)
    .getOrElse(success(undefined))
));

module.exports = isOptional;

