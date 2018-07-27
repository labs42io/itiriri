import { getIterator } from './getIterator';

export function fromGenerator<TElement>(generator: () => Iterable<TElement>): Iterable<TElement> {
  return {
    [Symbol.iterator]() {
      return getIterator(generator());
    },
  };
}
