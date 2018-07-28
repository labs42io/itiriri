# ArrayQuery: A powerfull iterator library

[![Build Status](https://travis-ci.org/labs42io/array-query.svg?branch=vlad)](https://travis-ci.org/labs42io/array-query)
[![Coverage Status](https://coveralls.io/repos/github/labs42io/array-query/badge.svg?branch=vlad)](https://coveralls.io/github/labs42io/array-query?branch=vlad)

## Basic Examples

```js
var foo = ArrayQuery.query([4,1,3,2]);

foo.first(); // 4
foo.last(); // 2

foo.sort().toArray(); // [1,2,3,4]
foo.sortDesc().toArray(); // [4,3,2,1]

foo.take(2); // [4,1]
foo.take(-3); // [1,3,2]

foo.skip(3); // [2]
foo.skip(-1); // [4,1,3]
```

## Sexy Examples

```js
var foo = ArrayQuery.query([6,1,5,4,2,3]);

foo.map((elem, idx) => elem*2).sort().take(2).toArray(); // [2,4]
// todo add more (fibonaci, primes, random)

```


## Todo
* Tests .entries
* Example folder with examples
* Documentation
* Publish to NPM
* Performance tests (CPU, memory)

---

## Features to consider
#### [.fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
#### [.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
#### [.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
#### [.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
#### [.flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
#### [.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
#### [.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
#### [.pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
#### [.push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
#### [.shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
#### [.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
#### [.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
#### [.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
#### [.unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)