'use strict';

const V = require('validator');
const R = require('ramda');
const curry = R.curry;
const compose = R.compose;
const ifElse = R.ifElse;
const ap = R.ap;
const id = R.identity;

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const isFailure = a => a.isFailure ? true : false;
const mergeM = a => a.merge();

const isMatch = curry((p, o) =>
  V.matches(o, p) ?
    Success(o) :
    Failure([`Value doesn't match ${p}`]));

const isAMatch = curry((pattern, type, value) =>
  compose(
    ifElse(
      isFailure,
      id,
      mergeM
    ),
    ap(Success(isMatch(pattern))),
    type
  )(value)
);

module.exports = isAMatch;

