import { iterator } from './iterator';

export function iterable<TElement>(target: () => Iterable<TElement>): Iterable<TElement> {
  return {
    [Symbol.iterator]() {
      return iterator(target());
    },
  };
}
