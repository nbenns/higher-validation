'use strict';

const HV = require('../index');

const SubModel = HV.Object({
  bob: HV.Number,
  jim: HV.Number
});

const Meow = HV.Match(HV.String, /^meow/);
const MeowToNumber = HV.Map(Meow, HV.Number);
const ArrayOfSubModel = HV.Array(SubModel);

const model = {
  first: HV.Number,
  second: HV.Optional(HV.Number),
  third: HV.Optional(HV.Any),
  fourth: HV.Any,
  fifth: MeowToNumber,
  sixth: HV.Optional(HV.Number),
  seventh: SubModel,
  eighth: HV.Any,
  nineth: HV.Array(HV.Number),
  ten: HV.Optional(ArrayOfSubModel)
};

const obj = {
  first: 2,
  second: undefined,
  fourth: '2',
  fifth: {
    meowA: 1,
    meowB: 'abc',
    C: 3
  },
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

