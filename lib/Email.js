'use strict';

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const {isEmail} = require('validator');
const maybeEmail = a => isEmail(a) ? Just(a) : Nothing();

const Type = require('./Type');

const HVEmail = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .chain(maybeEmail)
    .map(success)
    .getOrElse(failure('Not a valid Email'))
);

module.exports = HVEmail;

