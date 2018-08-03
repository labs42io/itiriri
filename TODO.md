# To do

## Current version

* Examples folder
* Finish documentation
* Publish to NPM

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