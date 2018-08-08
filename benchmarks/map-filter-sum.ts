import { Suite, Event } from 'benchmark';
import { query } from '../lib';

const input: number[] = [];

for (let i = 0; i < 100000; i++) {
  input.push(Math.random());
}

const suite = new Suite();

suite.add('itiriri', () => {
  query(input)
    .map(x => ({ value: x * 100 }))
    .filter(x => x.value < 50)
    .sum(x => x.value);
});

suite.add('Array', (deferred: any) => {
  input
    .map(x => ({ value: x * 100 }))
    .filter(x => x.value < 50)
    .reduce((a, b) => a + b.value, 0);
});

suite.on('cycle', (event: Event) => {
  console.log(String(event.target));
});

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any));
});

suite.run({ async: true });

