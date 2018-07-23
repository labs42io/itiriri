import { fromGenerator } from './fromGenerator';
import { getIterator } from './getIterator';

export function filter<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): Iterable<TElement> {
  return fromGenerator(() => generator(source, predicate));
}

function* generator<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): IterableIterator<TElement> {

  const iterator = getIterator(source);
  let current = iterator.next();
  let index = 0;

  while (!current.done) {
    if (predicate(current.value, index)) {
      yield current.value;
    }

    index += 1;
    current = iterator.next();
  }
}
