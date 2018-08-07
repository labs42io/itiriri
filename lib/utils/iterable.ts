import { iterator } from './iterator';

export function iterable<TElement>(target: () => IterableIterator<TElement>): Iterable<TElement> {
  return {
    [Symbol.iterator]() {
      return target();
    },
  };
}
