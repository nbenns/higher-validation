'use strict';

const Type = require('./Type');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const isNumber = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .chain(v => isNaN(v) ? Nothing() : Just(v))
    .map(success)
    .getOrElse(failure('Not a valid Number'))
);

module.exports = isNumber;

