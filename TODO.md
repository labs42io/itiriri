# Proposal and to be discussed

* (TBD) Consider `index()` instead of `at()`
* (TBD) Consider `length()` instead of `count()`

* `concat()` should have the parameter optional and allow direct value
* `prepend()` should have the parameter optional and allow direct value

* `exclude` should exclude only matched items and not produce a set

* `groupBy` to return [key, iterable] instead of iterable with key field
```ts
groupBy<K, E>(
  keySelector: (element: T, index: number) => K,
  valueSelector: (element: T, index: number) => E): IterableQuery<[K, IterableQuery<E>]>;
```

* `includes` extend with second parameter called `fromIndex` to be inline with JS
* `indexOf` extend with second parameter called `fromIndex` to be inline with JS
* `lastIndexOf` extend with second parameter called `fromIndex` to be inline with JS
* (TBD) `min`, `max` and `sort` use comparisons. `sort` is not inline with JS sort, should accept a comparer function.
Proposal to change signature of those methods to accept a comparer as in JS and rename current to `minBy`, `maxBy`, `sortBy`

* ensure in `slice` both parameters are optional
* ensure in `splice` only start parameter is required




## Todo

* Example folder with examples
* Create and test Browserify bundle 
* Documentation
* Publish to NPM
* Performance tests (CPU, memory)