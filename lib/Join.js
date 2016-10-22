'use strict';

const Type = require('./Type');
const HVTuple = require('./Tuple');

const {curry} = require('ramda');

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const HVJoin = Type((success, failure) => curry((splitter, type1, type2, value) =>
  Maybe
    .fromNullable(value)
    .map(splitter)
    .map(HVTuple(type1, type2))
    .map(v => v.isSuccess ? success(value) : v)
    .getOrElse(failure('Not a valid Join Type'))
));

module.exports = HVJoin;

