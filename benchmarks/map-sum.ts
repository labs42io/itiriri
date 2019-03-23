import { Suite, Event } from 'benchmark';
import { default as itiriri } from '../lib';

const input: number[] = [];

for (let i = 0; i < 100000; i++) {
  input.push(Math.random());
}

const suite = new Suite();

suite.add('itiriri', () => {
  itiriri(input)
    .map(x => x * 100)
    .sum();
});

suite.add('Array', () => {
  input
    .map(x => x * 10)
    .reduce((a, b) => a + b, 0);
});

suite.on('cycle', (event: Event) => {
  console.log(String(event.target));
});

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any));
});

suite.run({ async: true });

