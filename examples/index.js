'use strict';

const HV = require('../index');

const subModel = {
  bob: {isRequired: true, type: HV.Number},
  jim: {isRequired: true, type: HV.Number}
};

const model = {
  first: {isRequired: true, type: HV.Number},
  second: {isRequired: false, type: HV.Number},
  third: {isRequired: true},
  fourth: {},
  fifth: {isRequired: false, type: HV.Number},
  sixth: {isRequired: true, type: HV.Number},
  seventh: {isRequired: true, type: HV.Object(subModel)},
  eighth: {isRequired: false},
  nineth: {isRequired: true, type: HV.Array(HV.Number)}
};

const obj = {
  first: '2',
  second: '2',
  third: '2',
  fourth: '2',
  fifth: 'abc',
  seventh: {
    bob: '3'
  },
  eighth: undefined,
  nineth: [2,3,'abc']
};

const results = HV.Object(model, obj);

console.log(results);

console.log(HV.Object(model, 2));
console.log(HV.Object(model, null));
