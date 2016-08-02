'use strict';

const V = require('validator');
const isISO8601 = a => V.isISO8601(a) ? Just(a) : Nothing();

const Type = require('./Type');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const HVISO8601 = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .chain(isISO8601)
    .map(success)
    .getOrElse(failure('Not a valid ISO8601 String'))
);

module.exports = HVISO8601;

