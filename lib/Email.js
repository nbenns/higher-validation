'use strict';

const V = require('validator');
const isEmail = a => V.isEmail(a) ? Just(a) : Nothing();

const toString = a => a.toString();

const Type = require('./Type');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const HVEmail = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .map(toString)
    .chain(isEmail)
    .map(success)
    .getOrElse(failure('Not a valid Email'))
);

module.exports = HVEmail;

