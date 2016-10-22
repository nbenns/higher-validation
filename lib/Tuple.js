'use strict';

const {curry, curryN, head, last, map, concat} = require('ramda');

const Type = require('./Type');

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const Validation = require('data.validation');
const {Success} = Validation;

const HVTuple = Type((success, failure) => curry((type1, type2, value) =>
  Maybe
    .fromNullable(value)
    .map(pair =>
      Success(curryN(2, () => pair))
        .ap(type1(head(pair)).leftMap(map(concat(`first: `))))
        .ap(type2(last(pair)).leftMap(map(concat(`second: `))))
    )
    .getOrElse(failure('Not a valid Tuple'))
));

module.exports = HVTuple;

