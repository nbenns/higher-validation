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

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const isFailure = a => a.isFailure ? true : false;
const mergeM = a => a.merge();

const inRange = curry((s, e, o) => converge(and, [gte(s), lte(e)])(o) ? Success(o) : Failure([`Not in Range ${s} -> ${e}`]));

const isInRange = curry((type, start, end, value) =>
  compose(
    ifElse(
      isFailure,
      id,
      mergeM
    ),
    ap(Success(inRange(start, end))),
    type
  )(value)
);

module.exports = isInRange;

