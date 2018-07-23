import { getIterator } from './getIterator';
import { fromGenerator } from './fromGenerator';

export function flatten<T>(iterables: Iterable<Iterable<T>>): Iterable<T> {
  return fromGenerator(() => generator(iterables));
}

function* generator<T>(iterables: Iterable<Iterable<T>>): IterableIterator<T> {
  const outerIterator = getIterator(iterables);
  let outer = outerIterator.next();

  while (!outer.done) {
    const innerIterator = getIterator(outer.value);
    let inner = innerIterator.next();

    while (!inner.done) {
      yield inner.value;
      inner = innerIterator.next();
    }

    outer = outerIterator.next();
  }
}
