'use strict';

const {matches} = require('validator');

const {
  curry,
  compose,
  ifElse,
  ap,
  identity
} = require('ramda');

const {Failure, Success} = require('data.validation');

const isFailure = a => a.isFailure ? true : false;
const mergeM = a => a.merge();

const isMatch = curry((p, o) =>
  matches(o, p) ?
    Success(o) :
    Failure([`Value doesn't match ${p}`]));

const isAMatch = curry((pattern, type, value) =>
  compose(
    ifElse(
      isFailure,
      identity,
      mergeM
    ),
    ap(Success(isMatch(pattern))),
    type
  )(value)
);

module.exports = isAMatch;

