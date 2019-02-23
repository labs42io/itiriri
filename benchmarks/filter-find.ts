import { Suite, Event } from 'benchmark';
import { default as itiriri} from '../lib';

const input: number[] = [];

for (let i = 0; i < 100000; i++) {
  input.push(Math.random());
}

const suite = new Suite('Find index of an element within filtered result.');

suite.add('itiriri', () => {
  itiriri(input)
    .filter(x => x < 0.5)
    .findIndex(x => x.toString().startsWith('0.42'));
});

suite.add('Array', (deferred: any) => {
  input
    .filter(x => x < 0.5)
    .findIndex(x => x.toString().startsWith('0.42'));
});

suite.on('cycle', (event: Event) => {
  console.log(String(event.target));
});

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any));
});

suite.run({ async: false });

