'use strict';

const R = require('ramda');
const {
  curry,
  compose,
  converge,
  concat,
  map,
  toPairs,
  head,
  last,
  identity,
  sequence,
  pair,
  set,
  lensProp
} = require('ramda');

const Type = require('./Type');

const Validation = require('data.validation');
const {Failure, Success} = Validation;

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const objectBuilder = f => validation =>
  validation ?
      objectBuilder(compose(f, set(lensProp(head(validation)), last(validation)))) :
      f({});

const apply = f => f();
const applyMerge = (acc, val) => acc.ap(val);
const applyMergeIdentity = Success(objectBuilder(identity));
const applyToPair = (a, b) => converge(pair, [compose(a, head), compose(b, last)]);
const addIndexToError = (v, i) =>
  pair(
    head(v).leftMap(map(concat(`index ${i.toString()}: Key: `))),
    last(v).leftMap(map(concat(`index ${i.toString()}: Value: `)))
  );

const overPairs = (keyType, valueType) => pairs =>
  pairs
    .map(applyToPair(keyType, valueType))
    .map(addIndexToError)
    .map(sequence(Validation.of))
    .reduce(applyMerge, applyMergeIdentity)
    .map(apply);

const validateElements = (keyType, valueType) => pairs =>
  Maybe
    .fromNullable(keyType)
    .chain(t => t instanceof Function ? Just(t) : Nothing())
    .chain(() => Maybe.fromNullable(valueType))
    .chain(t => t instanceof Function ? Just(t) : Nothing())
    .map(() => pairs)
    .map(overPairs(keyType, valueType))
    .getOrElse(Failure(['Not a valid Type']));

const HVMap = Type((success, failure) => curry((keyType, valueType, map) =>
  Maybe
    .fromNullable(map)
		.chain(a => a instanceof Object ? Just(a) : Nothing())
    .map(toPairs)
    .map(validateElements(keyType, valueType))
    .getOrElse(failure('Not a valid Map'))
));

module.exports = HVMap;

