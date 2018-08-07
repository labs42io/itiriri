import { Suite, Event } from 'benchmark';
import { query } from '../lib';

const hugeArr: number[] = [];
const smallArr: number[] = [];

const takeCount = 1000;
const skipCount = 10000;

for (let i = 0; i < 100000; i++) {
  hugeArr.push(Math.random());
}

for (let i = 0; i < 10000; i++) {
  smallArr.push(Math.random());
}

const suite = new Suite();

suite.add('itiriri', () => {
  query(hugeArr)
    .map(x => x * 100)
    .take(1000)
    .toArray();
});

suite.add('Array', (deferred: any) => {
  hugeArr
    .map(x => x * 100)
    .slice(0, 1000);
});

suite.on('cycle', (event: Event) => {
  console.log(String(event.target));
});

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any));
});

suite.run({ async: true });

