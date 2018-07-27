import { fromGenerator } from '../utils/fromGenerator';

export function distinct<TElement, TKey>(
  source: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): Iterable<TElement> {
  return fromGenerator(function* () {
    const set = new Set<TKey>();

    for (const element of source) {
      const key = keySelector(element);

      if (!set.has(key)) {
        set.add(key);
        yield element;
      }
    }
  });
}
