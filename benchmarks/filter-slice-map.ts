import { Suite, Event } from 'benchmark';
import { query } from '../lib';

const hugeArr: number[] = [];

const takeCount = 1000;
const skipCount = 10000;

for (let i = 0; i < 100000; i++) {
  hugeArr.push(Math.random());
}

const suite = new Suite();

suite.add('itiriri', () => {
  query(hugeArr)
    .filter(x => x < 0.5)
    .slice(skipCount, takeCount)
    .map(x => x * 100)
    .toArray();
});

suite.add('Array', (deferred: any) => {
  hugeArr
    .filter(x => x < 0.5)
    .slice(skipCount, takeCount)
    .map(x => x * 10);
});

suite.on('cycle', (event: Event) => {
  console.log(String(event.target));
});

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any));
});

suite.run({ async: true });

