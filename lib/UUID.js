'use strict';

const V = require('validator');
const isUUID = a => V.isUUID(a) ? Just(a) : Nothing();

const Type = require('./Type');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const HVUUID = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .chain(isUUID)
    .map(success)
    .getOrElse(failure('Not a valid UUID'))
);

module.exports = HVUUID;

