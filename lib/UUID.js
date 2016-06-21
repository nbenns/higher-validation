'use strict';

const V = require('validator');
const isUUID = a => V.isUUID(a) ? Just(a) : Nothing();

const toString = a => a.toString();

const Type = require('./Type');
const HVString = require('./String');

const Maybe = require('data.maybe');
const Nothing = Maybe.Nothing;
const Just = Maybe.Just;

const HVUUID = Type.inherits(HVString, (success, failure) => value =>
  Maybe
    .fromNullable(value)
    .map(toString)
    .chain(isUUID)
    .map(success)
    .getOrElse(failure('Not a valid UUID'))
);

module.exports = HVUUID;

