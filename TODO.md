## Todo
### Current release
* Examples folder
* Finish documentation
* Publish to NPM

### Next release
* Implement `takeWhile` and `skipWhile`
* Implement `crossJoin`
* `join` -> `innerjoin` and make current `join` inline with JS array implementation
* `join`, `leftJoin`, `rightJoin`, `groupJoin` that accept a comparer function
* [Proposal] Implement `pages` method like `page(source: Iterable<T>, size: number):Iterable<T[size]>`
* [proposal] Implement `window` method like `window(source: Iterable<T>, size: number):Iterable<T[size]>`

* Performance tests (CPU, memory)
  * Comparison with JS native array
  * Comparison with popular JS libraries
* Create ES5 `...-es5` dedicated package from current one
* Async iterables - possibly create a separate `...-async` package

# Proposal and to be discussed
* ensure in `slice` both parameters are optional
* ensure in `splice` only start parameter is required
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
* (TBD) Consider `index()` instead of `at()`
* (TBD) Consider `length()` instead of `count()`
* (TBD) `min`, `max` and `sort` use comparisons. `sort` is not inline with JS sort, should accept a comparer function.
Proposal to change signature of those methods to accept a comparer as in JS and rename current to `minBy`, `maxBy`, `sortBy`


# Code review

* `fill` iterator not inline with JS:
```ts
[1, 2, 3].fill(4, 1, 2); // returns [1, 4, 3]
query([1, 2, 3]).fill(4, 1, 2); // returns [1, 4, 4]
```
End index if specified should not be included.
Adjust unit tests.

```ts
// As a good practice consider using '.' at the end of sentences (errors, documentation etc.)
throw new Error('Invalid start range, use positive index');
```

* `isIterable`
  * A even better check is to ensure that `typeof item[Symbol.iterator] === 'function'`.
  * Should also be covered with unit tests.

* `Query.forEach`
  * The implementation is perfectly correct, but reduce just doesn't feel right for this example.
  At the same time, reduce and map lead to allocation and creation of two iterators.
  I'd suggest that we use simple `for of` statement.
* `Query.slice` & `Query.splice`
  * end index should not be included
  * are negative indexes supported? If yes, cover with tests, if not then throw an error and also cover with tests.
* `Query.splice`
  * Implementation not optimized, source will be iterated twice. 
  This also leads to the idea we should cover with tests and ensure we iterate the source only once!
  * Due to increasing complexity in splice, I'd suggest that we create an iterator function for it.
* `Query.rightJoin`
  * has an implementation issue, `joinSelector` is incorrectly used. Make sure to add a better test that covers this.
  * remove commented out code

* `numberGenerator` 
  * is in file `generators.ts`, consider making them inline. What about name `numbers()` ?

* `Query` unit tests
  * `expect(source.wasIterated).to.be.false;` there should be a dedicated test where to use it.
  I mean each method should be covered with a test like `Is a deferred method`.
  Do not use it then in other tests as this lead to the situation that if an iterator is iterated all tests fail even if the implementation is correct.
* `Good job!`












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