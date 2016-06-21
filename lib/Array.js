'use strict';

const R = require('ramda');
const curry = R.curry;
const compose = R.compose;
const flip = R.flip;
const concat = R.concat;
const reverse = R.reverse;
const map = R.map;
const reduce = R.reduce;

const Type = require('./Type');

const Validation = require('data.validation');
const Success = Validation.Success;

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const arrayBuilder = f => val =>
  val ?
    arrayBuilder(compose(f, flip(concat)(val))) :
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

