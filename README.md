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



## Roadmap
### Cover with unit tests existing code
### Make the API more inline with JS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator) functions 
### Create a browser minified build
### Add documentation with examples
### Publish to NPM
### Implement performance tests: CPU and memory (if possible)
