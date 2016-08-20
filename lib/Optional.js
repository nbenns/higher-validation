'use strict';

const Type = require('./Type');

const {curry} = require('ramda');

const {Nothing, Just} = require('data.maybe');

const isOptional = Type(success => curry((type, value) =>
  Just(value)
    .chain(v => v === undefined ? Nothing() : Just(v))
    .map(type)
    .getOrElse(success(undefined))
));

module.exports = isOptional;

