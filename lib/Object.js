'use strict';

const R = require('ramda');
const curry = R.curry;
const curryN = R.curryN;
const compose = R.compose;
const converge = R.converge;
const id = R.identity;
const always = R.always;
const concat = R.concat;
const toPairs = R.toPairs;
const set = R.set;
const over = R.over;
const lensProp = R.lensProp;
const head = R.head;
const last = R.last;

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const checkIsValid = obj =>
  obj
    .type
    .ap(obj.value)
    .map(e => e.map(v => set(lensProp('value'), Just(v), obj)))
    .map(e => e.leftMap(a => a.map(concat(`${obj.name}: `))))
    .getOrElse(Success(obj));

const checkIsRequired = obj =>
  obj
    .isRequired
    .chain(req => req ? Just() : Nothing())
    .chain(() => obj.value.isNothing ? Just('bad') : Nothing())
    .map(always(Failure([`${obj.name}: Required but not provided`])))
    .getOrElse(Success(obj));

const validateProperty = obj =>
  Success(curryN(2, (...args) => last(args)))
    .ap(checkIsRequired(obj))
    .ap(checkIsValid(obj));

const mergeName = converge(set(lensProp('name')), [head, last]);
const setValueFrom = props => o => set(lensProp('value'), Maybe.fromNullable(props[o.name]), o);
const maybeIsRequired = over(lensProp('isRequired'), Maybe.fromNullable);
const maybeType = over(lensProp('type'), Maybe.fromNullable);
const apply = f => f();

const objectBuilder = f => validation =>
  validation ?
    objectBuilder(compose(f, set(lensProp(validation.name), validation.value.getOrElse(null)))) :
    f({});

const applyMerge = (acc, val) => acc.ap(val);
const applyMergeIdentity = Success(objectBuilder(id));

const processModel = model => obj =>
  toPairs(model)
    .map(mergeName)
    .map(setValueFrom(obj))
    .map(maybeIsRequired)
    .map(maybeType)
    .map(validateProperty)
    .reduce(applyMerge, applyMergeIdentity)
    .map(apply);

const isObject = curry((model, obj) =>
  Maybe
    .fromNullable(obj)
    .chain(o => o instanceof Object ? Just(o) : Nothing())
    .map(processModel(model))
    .getOrElse(Failure(['Not a valid Object']))
);

module.exports = isObject;

