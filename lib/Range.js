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
  flip
} = require('ramda');

const fgte = flip(gte);
const flte = flip(lte);

const {Failure, Success} = require('data.validation');

const isFailure = a => a.isFailure ? true : false;
const mergeM = a => a.merge();

const inRange = curry((s, e, o) =>
  converge(and, [fgte(s), flte(e)])(o) ?
    Success(o) :
    Failure([`Not in Range ${s} -> ${e}`]));

const isInRange = curry((start, end, type, value) =>
  compose(
    ifElse(
      isFailure,
      identity,
      mergeM
    ),
    ap(Success(inRange(start, end))),
    type
  )(value)
);

module.exports = isInRange;

