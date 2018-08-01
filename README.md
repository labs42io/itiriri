# ArrayQuery: A powerfull iterator library

[![Build Status](https://travis-ci.org/labs42io/array-query.svg?branch=dev)](https://travis-ci.org/labs42io/array-query)
[![Coverage Status](https://coveralls.io/repos/github/labs42io/array-query/badge.svg?branch=dev)](https://coveralls.io/github/labs42io/array-query?branch=dev)

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

* Example folder with examples
* Create and test Browserify bundle 
* Documentation
* Publish to NPM
* Performance tests (CPU, memory)

---

## Features to consider

### [.flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) ?

---

### API Documentation

* [at](#at)
* [average](#average)
* [concat](#concat)
* [count](#count)
* [distinct](#distinct)
* [entries](#entries)
* [every](#every)
* [exclude](#exclude)
* [fill](#fill)
* [filter](#filter)
* [find](#find)
* [findIndex](#findIndex)
* [findLast](#findLast)
* [findLastIndex](#findLastIndex)
* [first](#first)
* [flat](#flat)
* [forEach](#forEach)
* [groupBy](#groupBy)
* [groupJoin](#groupJoin)
* [includes](#)
* [indexOf](#)
* [intersect](#)
* [join](#)
* [keys](#)
* [last](#)
* [lastIndexOf](#)
* [leftJoin](#)
* [map](#)
* [max](#)
* [min](#)
* [prepend](#)
* [reduce](#)
* [reduceRight](#)
* [reverse](#)
* [rightJoin](#)
* [shuffle](#)
* [skip](#)
* [slice](#)
* [some](#)
* [sort](#)
* [sortDesc](#)
* [splice](#)
* [sum](#)
* [take](#)
* [toArray](#)
* [toGroups](#)
* [toMap](#)
* [toSet](#)
* [toString](#)
* [union](#)
* [values](#)

___

### `at`
Returns the element at a specified index.
```ts
at(index: number): T;
```

#### Parameters
  * `index` - *(required)* zero based index at which to get the element

For a negative index returns the element from the end of the sequence.  
If index is out of the range, returns `undefined` .

Example:
```ts
import { query } from 'array-query';

query(['a', 'b', 'c', 'd']).at(2)  // returns 'c'
query(['a', 'b', 'c', 'd']).at(-1) // returns 'd' 
query(['a', 'b', 'c', 'd']).at(10) // returns undefined 
```

### `average`
Returns the average value.
```ts
average(): number;
average(selector: (element: T, index: number) => number): number;
```

#### Parameters
  * `selector` - *(optional)* a value transformer function to apply to each element

For a sequence with no elements returns `undefined`.
Example:
```ts
import { query } from 'array-query';

query([41, 42, 43]).average()  // returns 42
query([{value: 1}, {value: 2}]).average(elem => elem.value) // returns 1.5 
query([]).average() // returns undefined 
```

### `concat`
Concatenates the sequence with another one.
```ts
concat(other: Iterable<T>): IterableQuery<T>;
```
#### Parameters
* `other` - *(required)* sequence to concatenate

`concat` is a deferred method and is executed only when the result sequence is iterated.

Example:
```ts
import { query } from 'array-query';

query([1, 2, 3]).concat([4, 5]).toArray()  // returns [1, 2, 3, 4, 5]
```

### `count`
Returns the number of elements in a sequence.
```ts
count(): number;
count(predicate: (element: T, index: number) => boolean): number;
```
#### Parameters
* `predicate` - *(optional)* a function to count only the elements that match the predicate

Example:
```ts
import { query } from 'array-query';

query([1, 2, 3, 4, 5]).count();  // returns 5
query([1, 2, 3, 4, 5]).count(elem => elem > 2);  // returns 3
```

### `distinct`
Returns a sequence of unique elements.
```ts
distinct(): IterableQuery<T>;
distinct<S>(selector: (element: T) => S): IterableQuery<T>;
```

#### Parameters
* `selector` - *(optional)* a value transformer function to be used for comparisons

`distinct` is a deferred method and is executed only when the result sequence is iterated.

Example:
```ts
import { query } from 'array-query';

query([1, 42, 3, 4, 1]).distinct().toArray();  // returns [1, 42, 3, 4]
query([{value: 1}, {value: 2}, {value: 1}])
  .distinct(elem => elem.value)
  .toArray(); // returns [{value: 1}, {value: 2}]
```

### `entries`
Returns a sequence of key/value pair for each element and its index.
```ts
entries(): IterableQuery<[number, T]>;
```

`entries` is a deferred method and is executed only when the result sequence is iterated.
Example:
```ts
import { query } from 'array-query';

query(['Alice', 'Bob', 'David']).entries().toArray();
// returns [[0, 'Alice'], [1, 'Bob'], [2, 'David']]
```

### `every`
Tests whether all the elements pass the predicate.
```ts
every(predicate: (element: T, index: number) => boolean): boolean;
```

#### Parameters
* `predicate` - *(required)* function to test for each element

Example:
```ts
import { query } from 'array-query';

query([2, 4, 9]).every(elem => elem > 0); // returns true
query([7, 23, 3]).every(elem => elem % 3 === 0); // returns false
```

### `exclude`
Returns a sequence of unique elements not contained in a given sequence.
```ts
exclude<S>(others: Iterable<T>): IterableQuery<T>;
exclude<S>(others: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;
```

#### Parameters
* `others` - *(required)* a sequence of elements to be excluded
* `selector` - *(optional)* a value transformer function to be used for comparisons

`exclude` is a deferred method and is executed only when the result sequence is iterated.

Example:
```ts
import { query } from 'array-query';

query([2, 0, 1, 8, 2]).exclude([0, 1]).toArray(); // returns [2, 8]
query([{id: 1}, {id: 2}])
  .exclude([{id: 2}, elem => elem.id])
  .toArray(); // returns [{id: 1}]
```

### `fill`
Returns a sequence filled from a start index to an end index with a static value.
The end index is not included.
```ts
fill(value: T): IterableQuery<T>;
fill(value: T, start: number): IterableQuery<T>;
fill(value: T, start: number, end: number): IterableQuery<T>;
```

#### Parameters
* `value` - *(required)* value to fill
* `start` - *(optional)* start index, defaults to 0
* `end`   - *(optional)* end index, defaults to sequence length

`fill` is a deferred method and is executed only when the result sequence is iterated.

Example:
```ts
import { query } from 'array-query';

query([1, 2, 3, 4, 5]).fill([7]).toArray(); // returns [7, 7, 7, 7, 7]
query([1, 2, 3, 4, 5]).fill([7, 3]).toArray(); // returns [1, 2, 3, 7, 7]
query([1, 2, 3, 4, 5]).fill([7, 1, 3]).toArray(); // returns [1, 7, 7, 4, 5]
```

### `filter`
Returns a sequence of elements that pass the predicate.

```ts
filter(predicate: (element: T, index: number) => boolean): IterableQuery<T>;
```
#### Parameters
* `predicate` - *(required)* function to test for each element

`filter` is a deferred method and is executed only when the result sequence is iterated.

Example:
```ts
import { query } from 'array-query';

query([1, 2, 3, 4, 5]).filter(elem => elem < 3).toArray(); // returns [1, 2]
query([1, 2, 3]).fill(elem > 10).toArray(); // returns []
```

### `find`
Finds the first element that satisfies the specified predicate.

```ts
find(predicate: (element: T, index: number) => boolean): T;
```

#### Parameters
* `predicate` - *(required)* function to test for each element

If no element satisfies the predicate, returns `undefined`.

Example:
```ts
import { query } from 'array-query';

query([1, 2, 3, 4, 5]).find(elem => elem % 2 === 0); // returns 2
query([1, 2, 3]).find(elem > 10); // returns undefined
```

### `findIndex`
Finds the first index at which a given element satisfies the specified predicate.

```ts
findIndex(predicate: (element: T, index: number) => boolean): number;
```

#### Parameters
* `predicate` - *(required)* function to test for each element

If no element satisfies the predicate, returns `-1`.

Example:
```ts
import { query } from 'array-query';

query([7, 12, 15]).findIndex(elem => elem > 10 && elem < 15); // returns 1
query([1, 2, 3]).findIndex(elem > 10); // returns -1
```

### `findLast`
Finds the last element that satisfies the specified predicate.

```ts
findLast(predicate: (element: T, index: number) => boolean): T;
```

#### Parameters
* `predicate` - *(required)* function to test for each element

If no element satisfies the predicate, returns `undefined`.

Example:
```ts
import { query } from 'array-query';

query([11, 7, 21]).findLast(elem => elem > 10); // returns 21
query([1, 2, 3]).findLast(elem > 10); // returns undefined
```

### `findLastIndex`
Finds the last index at which a given element satisfies the specified predicate.

```ts
findLastIndex(predicate: (element: T, index: number) => boolean): number;
```

#### Parameters
* `predicate` - *(required)* function to test for each element

If not present, returns -1.

Example:
```ts
import { query } from 'array-query';

query([11, 7, 21]).findLastIndex(elem => elem > 10); // returns 2
query([1, 2, 3]).findLastIndex(elem > 10); // returns -1
```

### `first`
Returns the first element.

```ts
first(): T;
```

For an empty sequence returns undefined.

Example:
```ts
import { query } from 'array-query';

query(['a', 'b', 'c']).first(); // returns 'a'
query([]).first(); // returns undefined
```

### `flat`
Returns a sequence with all sub-sequences concatenated.

```ts
flat<S>(selector: (element: T, index: number) => Iterable<S>): IterableQuery<S>;
```

#### Parameters
* `selector` - *(required)* a transformation function to map each element to a sequence

`flat` is a deferred method and is executed only when the result sequence is iterated.

Example:
```ts
import { query } from 'array-query';

query([{value: [1, 2], {values: [7, 9]}]).flat(elem => elem.value).toArray(); 
// returns [1, 2, 7, 9]
```

### `forEach`
Runs through every element and applies a given function.

```ts
forEach(action: (element: T, index: number) => void): void;
```

#### Parameters
* `action` - *(required)* function to apply on each element

Example:
```ts
import { query } from 'array-query';

query([1, 2, 3]).forEach(elem => console.log(elem)); 
// 1
// 2
// 3
```

### `groupBy`
Groups elements by a given key, optionaly aplying a transformation over each element.

```ts
groupBy<K, E>(
  keySelector: (element: T, index: number) => K,
  valueSelector: (element: T, index: number) => E): IterableQuery<IterableQueryGroup<K, E>>;
```

#### Parameters
* `keySelector` - *(required)* function that provides group's key
* `valueSelector` - *(optional)* function to transform values

`groupBy` is a deferred method and is executed only when the result sequence is iterated.

Example:
```ts
import { query } from 'array-query';

const students = [
  {name: 'Alice', gender: 'female'},
  {name: 'Bob', gender: 'male'},
  {name: 'David', gender: 'male'},
];

query(students).groupBy(elem => elem.gender, elem => elem.name).toArray(); 
// [['female', [Alice]], ['male', ['Bob', 'David']]]
```

### `groupJoin`
Returns a sequence of correlated elements where each element from the current sequence 
is matched with zero or more elements from the other sequence.





