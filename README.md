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
/*
 * {
 *   a: String,
 *   b: Number
 * }
 */

if (myobj) {
  var a = myobj.a.toString() || "";
  var b = Number(myobj.b);

  if (!isNaN(myobj.b)) {
    ...
  }
}
```

You can end up with a giant tree of if statements everywhere just to get to the point of sane code and depending on whether you can fit your logic all together, you may end up validating the same things everywhere in different functions and creating a giant mess of speghetti.

I wanted the benefits of a strongly typed language, but [TypeScript](https://www.typescriptlang.org/), [Purescript](http://www.purescript.org/), [Scalajs](https://www.scala-js.org/) and [Flow](https://flowtype.org/), though pretty cool, weren't cutting my usecase.
I can manage to keep a strongly typed style on my own and use unit tests to make sure of correctness, but it's really deserialization of types that I found was missing.

I want to make sure some JSON input matched some specific criteria, a model of a complex object that I could guarantee is correct.

I need Types, but at Runtime, not compile time... a dream of [Andreas Rossberg](https://drive.google.com/file/d/0B1v38H64XQBNT1p2XzFGWWhCR1k/view)
But until SoundScript and JS VMs implement type systems, I needed to fill this gap myself.

I wanted something fairly easy to define, as if it were a like defining a type in another language, or just define a standard Javascript Object.

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
There is nothing worse when learning to use an API you get an error and fix one issue, make another call, then having to fix another issue, and another and another.  I also wanted to be able to tell specifically where the error is located in the Object so its easy to identify and fix.

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

Let's take a look at the definition for Team again.

```javascript
const Team = HV.Object({
  id: HV.UUID,
  enabled: HV.Boolean,
  users: HV.Array(User)
});
```

See the definition for the users property? It's a Generic Type.  The HV.Array is a function that takes another HV.Type and returns a function that validates a Value.
Generics are like functions that take types as input and return a type as output.  They are also refered to as Higher Kinded Types (and that's where the name of this library comes from in case you were wondering).
Array is said to have a kind * -> * (type to type), its a function that takes one type and returns another type.
Array isn't a type on its own... its a type constructor.  You pass it a type like String and you get back a type of "Array Of Strings"

There is another type, HV.Map that has a kind * -> * -> *.
It takes 2 types, one for Keys and one for Values: HV.Map(HV.String, HV.Number).
If you wanted a Map from Strings to Arrays, you might try to do this:
```javascript
const StringToArrays = HV.Map(HV.String, HV.Array);
```
But that it doesn't make any sense as HV.Array is not a type.
What you want to do is probably this:
```javascript
const StringToArrays = HV.Map(HV.String, HV.Array(HV.Any));
```
HV.Array(HV.Any) gives you back JS Standard Arrays and allows you to do [1, 'abc', true].
It however can't be undefined or null instead of an Array, for that you need HV.Optional and HV.Nullable...
So if we wanted to removed restrictions of our typesystem completely for an Array, we would define it like so:

```javascript
const StandardArray = HV.Optional(HV.Nullable(HV.Array(HV.Any)));
```
Of course this gets you back into the same situation you were in before, but its good to know it is possible to do it.
Use Optional and especially Nullable sparingly.

If you use [Ramda](http://ramdajs.com/0.21.0/index.html) or [LoDash](https://lodash.com/) you might realize that above the type constructors are just functions composed with each other.
Meaning you can also write it like so:
```javascript
const R = require('ramda');
const HV = require('higher-validation');

const NOArray = R.compose(
  HV.Optional,
  HV.Nullable,
  HV.Array
);

const StandardArray = NOArray(HV.Any);
```

This composiblity is what allows you to create complex objects from simpler ones.
I also Curry functions everywhere, so you can partially apply a type constructor like Map for example:
```javascript
const R = require('ramda');
const HV = require('higher-validation');

const NOMapOfStringTo = R.compose(
  HV.Optional,
  HV.Nullable,
  HV.Map(HV.String)
);

const NOMapOfStringToAny = NOMapOfStringTo(HV.Any);
```

Another interesting thing to do would be to restrict the Range of a Type.  There are many functions available for this, and because our types are "First Class" we can mix values and types in one function to allow us to do this easily.
```javascript
const OneTo20 = HV.Range(1, 20, HV.Number);
const NonEmptyString = HV.Length(1, Infinity, HV.String);  // Built in
const AlphaNumericString = HV.Match(/^[A-z0-9]+$/, HV.String);  // Built in
```
This allows for some pretty complicated Types to be defined.  And mixed with some knowledge of XSS you could actually secure you're applications from certain attack vectors.  At this point there isn't any implementation of say NonHTMLString for example, but it is not beyond this libraries capabilities to do so.

You could do this yourself either by combining type constructors and range restrictors, or manually via HV.Type:
```javascript
const HV = require('higher-validation');

const EqualsA = HV.Type((success, failure) => value => {
 if (value === 'A') {
   return success(value);
 } else {
   return failure('Not an A');
 }
});

console.log(EqualsA('meow'));
// Validation { value: [ 'Not an A' ] } -- failure

console.log(EqualsA('A'));
// Validation { value: 'A' } -- success
```
As you can see, it is pretty similar to define an HV.Type as it is to define a Promise with resolve and reject.

