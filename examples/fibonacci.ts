import { query } from '../lib/Itiriri';
import { take } from '../lib/iterators/take';

function* fibonacci() {
  let [a, b] = [0, 1];

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Get 42nd Fibonacci number
const f42 = query(fibonacci()).nth(42);
console.log(`Fibonacci[42]: ${f42}`);

// Calculating sum of first 10
const topN = (n: number) => query(fibonacci()).take(n);
console.log(`Top 10: ${topN(10)}`);
console.log(`Sum of 10: ${topN(10).sum()}`);

// Get 5 random Fibonacci numbers from first 42
const random = query(fibonacci())
  .take(42)
  .shuffle()
  .take(5);

console.log(`5 random Fibonacci numbers: ${random}`);

// Finding first 5 Fibonacci numbers that contain 42
const top5Has42 = query(fibonacci())
  .filter(x => x.toString().indexOf('42') !== -1)
  .take(5);

console.log(`Top 5 that contain 42: ${top5Has42}`);

// Group first 100 in odd/even
const group = topN(100)
  .groupBy(x => x % 2 === 0)
  .map(x => `${x[0] ? 'Evens' : 'Odds'} group has ${x[1].length()} elements`);

console.log(group.toString());
