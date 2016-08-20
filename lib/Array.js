'use strict';

const {
  curry,
  compose,
  flip,
  concat,
  reverse,
  map,
  reduce
} = require('ramda');

const {Success} = require('data.validation');
const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const Type = require('./Type');

const arrayBuilder = f => val =>
  val ?
    arrayBuilder(compose(f, flip(concat)([val]))) :
    f([]);

const validateElements = type => arr =>
  Maybe
    .fromNullable(type)
    .chain(t => t instanceof Function ? Just(t) : Nothing())
    .map(() => arr)
    .map(a =>
      a.map((e, i) =>
        type(e)
          .leftMap(map(concat(`index ${i}: `)))
      )
    )
    .getOrElse(arr.map(Success));

const HVArray = Type((success, failure) => curry((type, value) =>
  Maybe
    .fromNullable(value)
    .chain(a => a instanceof Array ? Just(a) : Nothing())
    .map(validateElements(type))
    .map(reduce((acc, val) => acc.ap(val), Success(arrayBuilder(reverse))))
    .map(map(f => f()))
    .getOrElse(failure('Not a valid Array'))
));

module.exports = HVArray;

