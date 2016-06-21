'use strict';

const R = require('ramda');
const curryN = R.curryN;
const last = R.last;

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const Type = f => f(Success, err => Failure([err]));

Type.inherits = R.curry((type, f, val) =>
  Validation
    .Success(curryN(2, (...args) => last(args)))
    .ap(type(val))
    .ap(f(Success, err => Failure([err]))(val))
);

module.exports = Type;

