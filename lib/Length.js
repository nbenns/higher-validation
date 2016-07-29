'use strict';

const R = require('ramda');
const curry = R.curry;
const converge = R.converge;
const compose = R.compose;
const ifElse = R.ifElse;
const ap = R.ap;
const id = R.identity;
const and = R.and;
const gte = R.flip(R.gte);
const lte = R.flip(R.lte);
const length = R.length;

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const isFailure = a => a.isFailure ? true : false;
const mergeM = a => a.merge();

const betweenLength = curry((min, max, o) =>
  compose(
    converge(and, [gte(min), lte(max)]),
    length
  )(o) ?
    Success(o) :
    Failure([`Length not in range ${min} -> ${max}`]));

const isBetweenLengths = curry((min, max, type, value) =>
  compose(
    ifElse(
      isFailure,
      id,
      mergeM
    ),
    ap(Success(betweenLength(min, max))),
    type
  )(value)
);

module.exports = isBetweenLengths;

