'use strict';

const Type = require('./Type');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const isAny = Type((success, failure) => val =>
  Just(val)
    .chain(v => v === undefined ? Nothing() : Just(v))
    .map(success)
    .getOrElse(failure('Any type is required'))
);

module.exports = isAny;

