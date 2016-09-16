'use strict';

const Type = require('./Type');
const HVArray = require('./Array');

const {curry, uniq} = require('ramda');
const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const HVSet = Type((success, failure) => curry((type, values, value) =>
  Maybe
    .fromNullable(value)
    .chain(val => HVArray(type, values).isSuccess ? Just(val) : Nothing())
    .chain(val => uniq(values).indexOf(value) >= 0 ? Just(val) : Nothing())
    .map(success)
    .getOrElse(failure('Not a valid value in Set'))
));

module.exports = HVSet;

//Set(HV.String, ['a', 'b', 'c'], 'a')

