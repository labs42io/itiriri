import { iterable } from '../utils/iterable';

export function takeWhile<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): Iterable<TElement> {
  return iterable(function* () {
    let index = 0;

    for (const element of source) {
      if (!predicate(element, index++)) {
        return;
      }
      yield element;
    }
  });
}
