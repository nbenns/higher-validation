'use strict';

const Type = require('./Type');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const isString = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
		.chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .map(a => a.toString())
    .map(success)
    .getOrElse(failure('Not a valid String'))
);

module.exports = isString;

