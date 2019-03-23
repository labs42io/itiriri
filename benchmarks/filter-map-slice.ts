import { Suite, Event } from 'benchmark';
import { default as itiriri } from '../lib';

const sizes = [1000, 5000, 10000, 50000, 100000, 200000];
const inputs: number[][] = [];

sizes.forEach((size, idx) => {
  inputs[idx] = [];

  for (let i = 0; i < size; i++) {
    inputs[idx].push(Math.random());
  }
});

const suite = new Suite();

sizes.forEach((size, idx) => {
  const arr = inputs[idx];
  const takeCount = 100;

  suite.add(`itiriri ${size}`, () => {
    itiriri(arr)
      .filter(x => x < 0.5)
      .map(x => x * 100)
      .take(takeCount)
      .toArray();
  });

  suite.add(`Array ${size}`, () => {
    arr
      .filter(x => x < 0.5)
      .map(x => x * 100)
      .slice(0, takeCount);
  });
});

suite.on('cycle', (event: Event) => {
  console.log(String(event.target));
});

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any));
});

suite.run({ async: true });

