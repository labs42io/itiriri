import { getIterator } from '../iterators/getIterator';

export function indexOf<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): number {
  const iterator = getIterator(source);
  let index = 0;
  let current = iterator.next();

  while (!current.done) {
    if (predicate(current.value, index)) {
      return index;
    }

    current = iterator.next();
    index++;
  }

  return -1;
}
