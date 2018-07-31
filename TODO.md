# Proposal and to be discussed
* Consider `index()` instead of `at()`
* Consider `length()` instead of `count()`
* `concat()` should have the parameter optional and allow direct value
* `exclude` should exclude only matched items and not produce a set
* `groupBy` to return [key, iterable] instead of iterable with key field
```ts
groupBy<K, E>(
  keySelector: (element: T, index: number) => K,
  valueSelector: (element: T, index: number) => E): IterableQuery<[K, IterableQuery<E>]>;
```
