'use strict';

const R = require('ramda');

const {
  curry,
  converge,
  compose,
  ifElse,
  ap,
  identity,
  and,
  gte,
  lte,
  length
} = require('ramda');

const fgte = R.flip(R.gte);
const flte = R.flip(R.lte);

const {Failure, Success} = require('data.validation');

const isFailure = a => a.isFailure ? true : false;
const mergeM = a => a.merge();

const betweenLength = curry((min, max, o) =>
  compose(
    converge(and, [fgte(min), flte(max)]),
    length
  )(o) ?
    Success(o) :
    Failure([`Length not in range ${min} -> ${max}`]));

const isBetweenLengths = curry((min, max, type, value) =>
  compose(
    ifElse(
      isFailure,
      identity,
      mergeM
    ),
    ap(Success(betweenLength(min, max))),
    type
  )(value)
);

module.exports = isBetweenLengths;

