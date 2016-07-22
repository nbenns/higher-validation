'use strict';

const HV = require('../index');

const subModel = HV.Object({
  bob: HV.Number,
  jim: HV.Number
});

const model = {
  first: HV.Number,
  second: HV.Optional(HV.Number),
  third: HV.Optional(HV.Any),
  fourth: HV.Any,
  fifth: HV.Optional(HV.Number),
  sixth: HV.Optional(HV.Number),
  seventh: subModel,
  eighth: HV.Any,
  nineth: HV.Array(HV.Number),
  ten: HV.Optional(HV.Array(subModel))
};

const obj = {
  first: '2',
  second: '2',
  fourth: '2',
  fifth: '5',
  seventh: {
    // jim: 2,
    bob: '3'
  },
  eighth: undefined,
  nineth: [1, '2', 3, 'four'],
  ten: [
    {
      bob: 2,
      jim: 3
    },
    {
      bob: 5,
      jim: 'hi'
    }
  ]
};

const results = HV.Object(model, obj);

console.log(results);

