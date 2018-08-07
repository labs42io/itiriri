import { Suite, Event } from 'benchmark';
import { query } from '../lib';

const sizes = [1000000];
const inputs: string[][] = [];

sizes.forEach((size, idx) => {
  inputs[idx] = [];

  for (let i = 0; i < size; i++) {
    inputs[idx].push('https://www.npmjs.com/package/itiriri?' + i);
  }
});

const suite = new Suite();

sizes.forEach((size, idx) => {
  const arr = inputs[idx];

  suite.add(`itiriri ${size}`, () => {
    query(arr)
      .filter(x => x.endsWith('999'))
      .map(x => x.toUpperCase())
      .toArray();
  });

  suite.add(`Array ${size}`, () => {
    arr
      .filter(x => x.endsWith('999'))
      .map(x => x.toUpperCase());
  });
});

suite.on('cycle', (event: Event) => {
  console.log(String(event.target));
});

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any));
});

suite.run({ async: true });

