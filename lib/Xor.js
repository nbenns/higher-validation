'use strict';

const {curry} = require('ramda');
const Maybe = require('data.maybe');
const {Just} = Maybe;
const {Success, Failure} = require('data.validation');
const Type = require('./Type');

const errMessage = 'Not a valid Xor Type';

const xorValidation = curry(
  (a,b,val) => {
    const va = a(val);
    const vb = b(val);

    if (va.isSuccess || vb.isSuccess) {
      return (va.isSuccess && vb.isSuccess) ? Failure([errMessage]) : va.isSuccess ? va : vb
    } else {
      return Failure([errMessage])
    }
  }
);

const HVXor = Type((success, failure) => curry((firstType, secondType, value) =>
  Just(xorValidation)
    .ap(Maybe.fromNullable(firstType))
    .ap(Maybe.fromNullable(secondType))
    .ap(Maybe.fromNullable(value))
    .getOrElse(failure(errMessage))
));

module.exports = HVXor;

