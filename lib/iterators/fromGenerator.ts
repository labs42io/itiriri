import { getIterator } from './getIterator';

export function fromGenerator<TElement>(generator: () => Iterable<TElement>): Iterable<TElement> {
  return {
    [Symbol.iterator]() {
      let iterator: Iterator<TElement>;
      return {
        next() {
          if (iterator === undefined) {
            iterator = getIterator(generator());
          }

          return iterator.next();
        },
      };
    },
  };
}
