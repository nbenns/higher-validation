'use strict';

const Type = require('./Type');

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const isString = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
		.chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .map(success)
    .getOrElse(failure('Not a valid String'))
);

module.exports = isString;

