import { toSet } from '../reducers/toSet';
import { iterable } from '../utils/iterable';
import { map } from './map';

export function exclude<TElement, TKey>(
  source: Iterable<TElement>,
  exclude: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): Iterable<TElement> {
  return iterable(function* () {
    const exclusionSet = toSet(map(exclude, keySelector));

    for (const element of source) {
      const key = keySelector(element);

      if (!exclusionSet.has(key)) {
        yield element;
      }
    }
  });
}
