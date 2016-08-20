'use strict';

const {isURL} = require('validator');
const maybeURL = a => isURL(a) ? Just(a) : Nothing();

const Type = require('./Type');

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const HVURL = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .chain(maybeURL)
    .map(success)
    .getOrElse(failure('Not a valid UUID'))
);

module.exports = HVURL;

