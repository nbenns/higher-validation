'use strict';

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const Type = require('./Type');

const isBoolean = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'boolean' ? Just(a) : Nothing())
    .map(success)
    .getOrElse(failure('Not a valid Boolean'))
);

module.exports = isBoolean;

