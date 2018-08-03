# To do

## Current version

* Examples folder
* Finish documentation
* Publish to NPM

### Proposal and to be discussed

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

* Consider `length()` instead of `count()`
* `min`, `max` and `sort` use comparisons. `sort` is not inline with JS sort, should accept a comparer function.

## Next versions

* Implement `takeWhile` and `skipWhile` like functions
* Implement `crossJoin`
* [Proposal]`join`, `leftJoin`, `rightJoin`, `groupJoin` that accept a comparer function
* [Proposal] `join` -> `innerjoin` and make current `join` inline with JS array implementation
* [Proposal] Implement `pages` method like `page(source: Iterable<T>, size: number):Iterable<T[size]>`
* [proposal] Implement `window` method like `window(source: Iterable<T>, size: number):Iterable<T[size]>`

* Performance tests (CPU, memory)
  * Comparison with JS native array
  * Comparison with popular JS libraries
* Create ES5 `...-es5` separate package from current one
* Async iterables, create a separate `...-async` package

## Sexy Examples

```js
var foo = ArrayQuery.query([6,1,5,4,2,3]);

foo.map((elem, idx) => elem*2).sort().take(2).toArray(); // [2,4]
// todo add more (fibonacci, primes, random)

```