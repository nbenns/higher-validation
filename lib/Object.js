'use strict';

const Type = require('./Type');

const {
  identity,
  compose,
  curry,
  map,
  reduce,
  set,
  lensProp,
  head,
  tail,
  last,
  pair,
  converge,
  apply,
  ap,
  concat,
  flip
} = require('ramda');

const fap = flip(ap);

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const Validation = require('data.validation');
const {Success} = Validation;

const objectBuilder = f => validation => {
  if (validation) {
    const val = last(validation).getOrElse(undefined);

    if (val === undefined) {
      return objectBuilder(f);
    } else {
      return objectBuilder(compose(f, set(lensProp(head(validation)), val)));
    }

  } else {
    return f({});
  }
};

const applyMerge = (acc, val) => acc.ap(val);
const applyMergeIdentity = Success(objectBuilder(identity));

const mergeObjectsToPairs = model => obj => {
  const output = [];
  const keys = Object.keys(model);

  for (let key of keys) {
    output.push([key, [model[key], obj[key]]]);
  }

  return output;
};

const wrap = a => last(a).isSuccess ? Success(a) : last(a);
const applyFirstToSecond = converge(apply, [head, tail]);
const addPropToError = v => pair(head(v), last(v).leftMap(map(concat(concat(head(v), ': ')))));
const applyAndFlatten = converge(pair, [head, compose(head, map(applyFirstToSecond), tail)]);

const processModel = model =>
  compose(
    fap(Success()),
    reduce(applyMerge, applyMergeIdentity),
    map(wrap),
    map(addPropToError),
    map(applyAndFlatten),
    mergeObjectsToPairs(model)
  );

const isObject = Type((success, failure) => curry((model, obj) =>
  Maybe
    .fromNullable(obj)
    .chain(o => typeof o === 'object' ? Just(o) : Nothing())
    .map(processModel(model))
    .getOrElse(failure('Not a valid Object'))
));

module.exports = isObject;

