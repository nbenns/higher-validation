# higher-validation
[![Code Style](https://img.shields.io/badge/code%20style-functional-DF0174.svg)](https://github.com/fantasyland/fantasy-land)
[![Build Status](https://travis-ci.org/nbenns/higher-validation.svg?branch=master)](https://travis-ci.org/nbenns/higher-validation)
[![Coverage Status](https://coveralls.io/repos/github/nbenns/higher-validation/badge.svg?branch=master)](https://coveralls.io/github/nbenns/higher-validation?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/nbenns/higher-validation/badges/score.svg)](https://www.bithound.io/github/nbenns/higher-validation)
[![bitHound Dependencies](https://www.bithound.io/github/nbenns/higher-validation/badges/dependencies.svg)](https://www.bithound.io/github/nbenns/higher-validation/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/nbenns/higher-validation/badges/devDependencies.svg)](https://www.bithound.io/github/nbenns/higher-validation/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/nbenns/higher-validation/badges/code.svg)](https://www.bithound.io/github/nbenns/higher-validation)

Javascript's dynamic typing can make it easy to quickly develop simple applications and get them out the door.
However, there reaches a point where it bites you, usually when you want to guarantee I/O matches a given criteria and it leaves you with code like so:

```javascript
if (myobj === null || myobj === undefined) { ... }

var a = myobj.a || "";

if (!isNaN(myobj.b)) {...}
```

You end up validating the same things everywhere and creating a giant mess of speghetti.

I wrote this library because I was sick of it...
I wanted the benefits of a strongly typed language, but TypeScript, Purescript, Scalajs and Flow weren't cutting my usecase.
I can manage to keep a strongly typed style on my own and use unit tests to make sure of correctness, but it's really the usecase of deserialization that I found was missing.

I want to make sure some JSON input matched some specific criteria, a model of a complex object that I could guarantee is correct.

I wanted something like this:

```javascript
const HV = require('higher-validation');

const User = HV.Object({
  id: HV.UUID,
  firstName: HV.NonEmptyString,
  lastName: HV.NonEmptyString,
  email: HV.Email,
  enrollmentDate: HV.Date
});

const Team = HV.Object({
  id: HV.UUID,
  enabled: HV.Boolean,
  users: HV.Array(User)
});
```

I also didn't want a verification that the input matches the type, instead if its successful it will give you the result wrapped in a special object called the [Validation Applicative Functor](https://github.com/folktale/data.validation).
If you don't know what that is, that's ok... you don't really need to.  Just know that it's similar to a Array (you can map over it) but it only contains one value (with .value), and its also like a Promise where you can have two states: Success and Failure which you can call isSuccess or isFailure on the object to tell whether the input validated correctly.

For failures I wanted to have a list of all of the things that are invalid about the object.
There is nothing worse then using someone else's API and fixing one issue, making a call, then having to fix another issue, and another and another.  I also wanted to be able to tell specifically where the error is located in the Object so its easy to identify and fix.

```javascript
const validateTeam(req, res, next) {
  const team = Team(req.body);
  let err;
  
  if (team.isSuccess) {
    req.team = team.value;
  } else {
    err = new BadRequestError(team.value);
  }
  
  next(err);
}
```

If you receive valid input isSuccess === true, and value is the validated Object.  If the input is invalid you will receive and Array of Strings like this:

```javascript
[
  'id: Not a valid UUID',
  'enabled: Not a valid Boolean',
  'users: index 0: id: Not a valid UUID',
  ...
]
```

