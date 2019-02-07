import { iterable } from '../utils/iterable';

export function skipWhile<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): Iterable<TElement> {
  return iterable(function* () {
    let index = 0;
    let skipped = false;

    for (const element of source) {
      if (!skipped && predicate(element, index++)) {
        continue;
      }
      skipped = true;
      yield element;
    }
  });
}
