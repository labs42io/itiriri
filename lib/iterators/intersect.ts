import { toSet } from '../reducers/toSet';
import { fromGenerator } from '../utils/fromGenerator';
import { map } from './map';

export function intersect<TElement, TKey>(
  source: Iterable<TElement>,
  others: Iterable<TElement>,
  selector: (element: TElement) => TKey,
): Iterable<TElement> {
  return fromGenerator(function* () {
    const includedSet = new Set<TKey>();
    const othersSet = toSet(map(others, selector));

    for (const element of source) {
      const key = selector(element);

      if (!includedSet.has(key) && othersSet.has(key)) {
        includedSet.add(key);
        yield element;
      }
    }
  });
}
