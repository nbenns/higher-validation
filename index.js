'use strict';

module.exports = {
  Any: require('./lib/Any'),
  None: require('./lib/None'),
  Boolean: require('./lib/Boolean'),
  Number: require('./lib/Number'),
  Object: require('./lib/Object'),
  Tuple: require('./lib/Tuple'),
  Array: require('./lib/Array'),
  Map: require('./lib/Map'),
  String: require('./lib/String'),
  Primative: require('./lib/Primative'),
  UUID: require('./lib/UUID'),
  URL: require('./lib/URL'),
  Email: require('./lib/Email'),
  NonEmptyString: require('./lib/NonEmptyString'),
  AlphaNumericString: require('./lib/AlphaNumericString'),
  AlphaString: require('./lib/AlphaString'),
  NumericString: require('./lib/NumericString'),
  ISO8601String: require('./lib/ISO8601String'),
  Type: require('./lib/Type'),
  Nullable: require('./lib/Nullable'),
  Optional: require('./lib/Optional'),
  Range: require('./lib/Range'),
  Match: require('./lib/Match'),
  Length: require('./lib/Length'),
  Xor: require('./lib/Xor'),
  Set: require('./lib/Set'),
  Join: require('./lib/Join')
};

