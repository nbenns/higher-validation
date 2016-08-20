'use strict';

const Type = require('./Type');
const {Nothing, Just} = require('data.maybe');

const isAny = Type((success, failure) => val =>
  Just(val)
    .chain(v => v === undefined ? Nothing() : Just(v))
    .map(success)
    .getOrElse(failure('Any type is required'))
);

module.exports = isAny;

