import { getIterator } from './getIterator';

export function fromGenerator<TElement>(generator: () => Iterable<TElement>): Iterable<TElement> {
  return {
    [Symbol.iterator]() {
      const iterator = getIterator(generator());
      return {
        next() {
          return iterator.next();
        },
      };
    },
  };
}
