import { query } from './lib/Query';
import { IterableQuery } from './lib/types/IterableQuery';

// This is a sample test file.

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const q: IterableQuery<number> = query(arr);

console.log(`Length: ${q.length()}`);
console.log(`Length > 5: ${q.length(x => x > 5)}`);

console.log(`Average: ${q.average()}`);
console.log(`Minimum: ${q.min()}`);
console.log(`Maximum: ${q.max()}`);
console.log(`Sum: ${q.sum()}`);

console.log(`First: ${q.first()}`);
console.log(`First > 5: ${q.find(x => x > 5)}`);
console.log(`Last: ${q.last()}`);
console.log(`Last < 5: ${q.findLast(x => x < 5)}`);

console.log(`Nth(0): ${q.nth(0)}`);
console.log(`Nth(100): ${q.nth(100)}`);

console.log(`Every > 0: ${q.every(x => x > 0)}`);
console.log(`Every > 5: ${q.every(x => x > 5)}`);
console.log(`Some > 5: ${q.some(x => x > 5)}`);
console.log(`Some > 10: ${q.every(x => x > 10)}`);

console.log(`Sort: ${q.sort().toArray().join(', ')}`);
console.log(`Reverse: ${q.reverse().toArray().join(', ')}`);

console.log(`Filter > 5: ${q.filter(x => x > 5).toArray().join(', ')}`);
console.log(`Exclude [1,2,9]: ${q.exclude([1, 2, 9]).toArray().join(', ')}`);
console.log(`Map: ${q.map(x => x % 2 === 0 ? 0 : 1).toArray().join(', ')}`);
console.log(`MapAll: 
 ${q.flat(x => x % 2 === 0 ? [x] : [x, 10 * x]).toArray().join(', ')}`);

console.log(`Take 3: ${q.take(3).toArray().join(', ')}`);
console.log(`Skip 7: ${q.skip(7).toArray().join(', ')}`);

console.log(`Distinct: ${q.distinct().toArray().join(', ')}`);
console.log(`DistinctBy: ${q.distinct(x => x % 2 === 0 ? 0 : 1).toArray().join(', ')}`);

console.log(`ForEach: ${q.map(x => ({ x })).forEach(x => x.x *= 10)}`);
console.log(`GroupBy: ${q.groupBy(x => x < 5 ? 0 : 1)
  .toArray()
  .map(x => `(${x[0]})[${x[1].toArray().join(', ')}]`).join(', ')}`);
console.log(`Concat: ${q.concat(query([11, 12])).toArray().join(', ')}`);
console.log(`ToMap: ${q.toMap(x => x, x => x)}`);

for (const e of q) {
  console.log(e);
}
