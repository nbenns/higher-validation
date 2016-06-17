'use strict';

const Validation = require('data.validation');
const Failure = Validation.Failure;
const Success = Validation.Success;

const Type = f => f(Success, err => Failure([err]));

module.exports = Type;

