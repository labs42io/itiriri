import { toSet } from '../reducers/toSet';
import { fromGenerator } from '../utils/fromGenerator';
import { map } from './map';

export function except<TElement, TKey>(
  source: Iterable<TElement>,
  exclude: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): Iterable<TElement> {
  return fromGenerator(() => generator(source, exclude, keySelector));
}

function* generator<TElement, TKey>(
  source: Iterable<TElement>,
  exclude: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): Iterable<TElement> {
  const exclusionSet = toSet(map(exclude, keySelector));

  for (const element of source) {
    const key = keySelector(element);

    if (!exclusionSet.has(key)) {
      exclusionSet.add(key);
      yield element;
    }
  }
}
