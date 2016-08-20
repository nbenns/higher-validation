'use strict';

const Type = require('./Type');

const {curry} = require('ramda');

const {Nothing, Just} = require('data.maybe');

const isNullable = Type(success => curry((type, value) =>
  Just(value)
    .chain(v => v === null ? Nothing() : Just(v))
    .map(type)
    .getOrElse(success(null))
));

module.exports = isNullable;

