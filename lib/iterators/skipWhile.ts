import { iterable } from '../utils/iterable';

export function skipWhile<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): Iterable<TElement> {
  return iterable(function* () {
    let index = 0;
    let skiped = false;

    for (const element of source) {
      if (!skiped && predicate(element, index++)) {
        continue;
      }
      skiped = true;
      yield element;
    }
  });
}
