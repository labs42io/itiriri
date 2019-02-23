import { Suite, Event } from 'benchmark';
import { default as itiriri} from '../lib';

const sizes = [1000000];
const inputs: { name: string, value: number }[][] = [];

sizes.forEach((size, idx) => {
  inputs[idx] = [];

  for (let i = 0; i < size; i++) {
    inputs[idx].push({
      name: `itiriri-${i}`,
      value: Math.floor(Math.random() * 100),
    });
  }
});

const suite = new Suite();

sizes.forEach((size, idx) => {
  const arr = inputs[idx];

  suite.add(`itiriri ${size}`, () => {
    itiriri(arr)
      .filter(x => x.value > 40)
      .filter(x => x.value < 60)
      .map(x => x.name.toUpperCase())
      .toArray();
  });

  suite.add(`Array ${size}`, () => {
    arr
      .filter(x => x.value > 40)
      .filter(x => x.value < 60)
      .map(x => x.name.toUpperCase());
  });
});

suite.on('cycle', (event: Event) => {
  console.log(String(event.target));
});

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any));
});

suite.run({ async: true });

