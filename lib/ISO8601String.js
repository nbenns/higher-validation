'use strict';

const {isISO8601} = require('validator');
const maybeISO8601 = a => isISO8601(a) ? Just(a) : Nothing();

const Type = require('./Type');

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const HVISO8601 = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .chain(maybeISO8601)
    .map(success)
    .getOrElse(failure('Not a valid ISO8601 String'))
);

module.exports = HVISO8601;

