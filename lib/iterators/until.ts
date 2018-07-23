import { fromGenerator } from './fromGenerator';
import { getIterator } from './getIterator';

export function* until<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): Iterable<TElement> {
  return fromGenerator(() => generator(source, predicate));
}

function* generator<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): Iterable<TElement> {

  const iterator = getIterator(source);
  let current = iterator.next();
  let index = 0;

  while (!current.done) {
    if (predicate(current.value, index)) {
      break;
    }

    yield current.value;

    index += 1;
    current = iterator.next();
  }
}
