'use strict';

const Type = require('./Type');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const isBoolean = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'boolean' ? Just(a) : Nothing())
    .map(success)
    .getOrElse(failure('Not a valid Boolean'))
);

module.exports = isBoolean;

