'use strict';

const R = require('ramda');
const curry = R.curry;
const compose = R.compose;
const converge = R.converge;
const concat = R.concat;
const map = R.map;
const toPairs = R.toPairs;
const head = R.head;
const last = R.last;
const id = R.identity;
const sequence = R.sequence;
const pair = R.pair;
const set = R.set;
const lensProp = R.lensProp;

const Type = require('./Type');

const Validation = require('data.validation');
const Success = Validation.Success;

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const objectBuilder = f => validation =>
  validation ?
      objectBuilder(compose(f, set(lensProp(head(validation)), last(validation)))) :
      f({});

const apply = f => f();
const applyMerge = (acc, val) => acc.ap(val);
const applyMergeIdentity = Success(objectBuilder(id));
const applyToPair = (a, b) => converge(pair, [compose(a, head), compose(b, last)]);
const addIndexToError = (v, i) =>
  pair(
    head(v).leftMap(map(concat(concat(i.toString(), ': Key: ')))),
    last(v).leftMap(map(concat(concat(i.toString(), ': Value: '))))
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
    .getOrElse(pairs.map(Success));

const HVMap = Type((success, failure) => curry((keyType, valueType, map) =>
  Maybe
    .fromNullable(map)
		.chain(a => a instanceof Object ? Just(a) : Nothing())
    .map(toPairs)
    .map(validateElements(keyType, valueType))
    .getOrElse(failure('Not a valid Map'))
));

module.exports = HVMap;

