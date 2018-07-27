import { getIterator } from '../utils/getIterator';

export function first<TElement>(source: Iterable<TElement>): TElement {
  const iterator = getIterator(source);
  const current = iterator.next();

  return current.done ? undefined : current.value;
}
