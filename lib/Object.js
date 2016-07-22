'use strict';

const Type = require('./Type');

const R = require('ramda');
const id = R.identity;
const compose = R.compose;
const curry = R.curry;
const map = R.map;
const reduce = R.reduce;
const set = R.set;
const lensProp = R.lensProp;
const head = R.head;
const tail = R.tail;
const last = R.last;
const pair = R.pair;
const converge = R.converge;
const apply = R.apply;
const fap = R.flip(R.ap);
const concat = R.concat;

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const Validation = require('data.validation');
const Success = Validation.Success;

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
const applyMergeIdentity = Success(objectBuilder(id));

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

