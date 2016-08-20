'use strict';

const {Failure, Success} = require('data.validation');

const Type = f => f(Success, err => Failure([err]));

module.exports = Type;

