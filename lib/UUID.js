'use strict';

const {isUUID} = require('validator');
const maybeUUID = a => isUUID(a) ? Just(a) : Nothing();

const Type = require('./Type');

const Maybe = require('data.maybe');
const {Nothing, Just} = Maybe;

const HVUUID = Type((success, failure) => value =>
  Maybe
    .fromNullable(value)
    .chain(a => typeof a === 'string' ? Just(a) : Nothing())
    .chain(maybeUUID)
    .map(success)
    .getOrElse(failure('Not a valid UUID'))
);

module.exports = HVUUID;

