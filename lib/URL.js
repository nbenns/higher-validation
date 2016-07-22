'use strict';

const V = require('validator');
const isURL = a => V.isURL(a) ? Just(a) : Nothing();

const Type = require('./Type');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const HVURL = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .chain(isURL)
    .map(success)
    .getOrElse(failure('Not a valid UUID'))
);

module.exports = HVURL;

