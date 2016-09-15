const HVString = require('./String');
const HVNumber = require('./Number');
const HVBoolean = require('./Boolean');
const HVXor = require('./Xor');

const HVPrimative = HVXor(HVString, HVXor(HVNumber, HVBoolean));

module.exports = HVPrimative;

