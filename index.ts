import { query, Query } from './lib';

// This is a sample test file.
// In order to run code in this file, use following command:
// $ ts-node "lib/Lesson 4/index"
// Providing that earlier you do: $ npm i

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const q: Query<number> = query(arr);

console.log(`Count: ${q.count()}`);
console.log(`Count > 5: ${q.count(x => x > 5)}`);

console.log(`Average: ${q.average()}`);
console.log(`Minimum: ${q.min()}`);
console.log(`Maximum: ${q.max()}`);
console.log(`Sum: ${q.sum()}`);

console.log(`First: ${q.first()}`);
console.log(`First > 5: ${q.first(x => x > 5)}`);
console.log(`Last: ${q.last()}`);
console.log(`Last < 5: ${q.last(x => x < 5)}`);

console.log(`At(0): ${q.at(0)}`);
console.log(`At(100): ${q.at(100)}`);

console.log(`Every > 0: ${q.every(x => x > 0)}`);
console.log(`Every > 5: ${q.every(x => x > 5)}`);
console.log(`Some > 5: ${q.some(x => x > 5)}`);
console.log(`Some > 10: ${q.every(x => x > 10)}`);

console.log(`Sort: ${q.sort().toArray().join(', ')}`);
console.log(`SortDesc: ${q.sortDesc().toArray().join(', ')}`);
console.log(`Reverse: ${q.reverse().toArray().join(', ')}`);

console.log(`Filter > 5: ${q.filter(x => x > 5).toArray().join(', ')}`);
console.log(`Exclude [1,2,9]: ${q.exclue([1, 2, 9]).toArray().join(', ')}`);
console.log(`Map: ${q.map(x => x % 2 === 0 ? 0 : 1).toArray().join(', ')}`);
console.log(`MapAll: 
 ${q.flatten(x => x % 2 === 0 ? [x] : [x, 10 * x]).toArray().join(', ')}`);

console.log(`Take 3: ${q.take(3).toArray().join(', ')}`);
console.log(`Skip 7: ${q.skip(7).toArray().join(', ')}`);

console.log(`Distinct: ${q.distinct().toArray().join(', ')}`);
console.log(`DistinctBy: ${q.distinct(x => x % 2 === 0 ? 0 : 1).toArray().join(', ')}`);

console.log(`ForEach: ${q.map(x => ({ x })).forEach(x => x.x *= 10)
  .map(x => x.x).toArray().join(', ')}`);
console.log(`GroupBy: ${q.groupBy(x => x < 5 ? 0 : 1, x => x).toArray().join(', ')}`);
console.log(`Concat: ${q.concat(query([11, 12])).toArray().join(', ')}`);
console.log(`ToMap: ${q.toMap(x => x, x => x)}`);

// Available only when targeting ES6
// for (const e of q) {
//   console.log(e);
// }
