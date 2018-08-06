import * as IxES6 from '@reactivex/ix-es2015-cjs'
import { Event, Suite } from 'benchmark'
import * as IxES5 from 'ix'
import * as _ from 'lodash'
import 'rxjs'
import { IteratorObservable } from 'rxjs/observable/IteratorObservable.js'
import { iterate } from 'iterare'
import { query } from '../lib';

const suite = new Suite()

// Simulate iterating over a very lage Set of strings and applying a filter on it, then taking only the first 1000 elements
// Smart implementations should only apply the filter predicate to the first 5 elements
const hugeArr = new Array<number>()
for (let i = 0; i < 100000; i++) {
  hugeArr.push(i);
}

suite.add('iterare', () => {
  iterate(hugeArr)
    // .filter(x => x < 0.5)
    .take(1000)
    .map(x => x + 1)
    .toArray()
})

suite.add('itiriri', () => {
  query(hugeArr)
    // .filter(x => x < 0.5)
    .take(1000)
    .map(x => x + 1)
    .toArray()
})

suite.add('array', () => {
  hugeArr
    // .filter(x => x < 0.5)
    .slice(0, 1000).map(x => x + 1);
})

suite.add('Lodash', () => {
  // Need to convert to Array first, because lodash does not support Sets
  // This uses lodash's lazy evaluation feature
  return Array.from(
    _(Array.from(hugeArr))
      // .filter((x: number) => x < 0.5)
      .take(1000)
      .map(x => x + 1)
      .value()
  )
})

suite.add('RxJS', (deferred: any) => {
  new IteratorObservable<number>(hugeArr[Symbol.iterator]())
    // .filter((x: number) => x < 0.5)
    .take(1000)
    .map(x => x + 1)
    .toArray()
    .subscribe(result => {
      // Finished
    })
})

suite.add('IxJS (ES5)', () => {
  return IxES5.Iterable.from(hugeArr)
    // .filter((x: number) => x < 0.5)
    .take(1000)
    .map(x => x + 1)
    .toArray()
})

suite.add('IxJS (ES6)', () => {
  return IxES6.Iterable.from(hugeArr)
    // .filter((x: number) => x < 0.5)
    .take(1000)
    .map(x => x + 1)
    .toArray()
})

suite.on('cycle', (event: Event) => {
  console.log(String(event.target))
})

suite.on('complete', function (this: Suite) {
  console.log('Fastest is ' + this.filter('fastest').map('name' as any))
})

suite.run({ async: true })