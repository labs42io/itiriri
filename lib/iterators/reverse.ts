import { iterable } from '../utils/iterable';
import { toArray } from '../reducers/toArray';

export function reverse<TElement>(source: Iterable<TElement>): Iterable<TElement> {
  return iterable(function* () {
    const elements = toArray(source);

    for (let n = elements.length - 1, i = n; i >= 0; i--) {
      yield elements[i];
    }
  });
}
