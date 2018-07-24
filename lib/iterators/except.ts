import { toSet } from '../reducers/toSet';
import { filter } from './filter';
import { fromGenerator } from './fromGenerator';
import { map } from './map';

export function except<TElement, TKey>(
  source: Iterable<TElement>,
  exclude: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): Iterable<TElement> {
  return fromGenerator(() => generator(source, exclude, keySelector));
}

function generator<TElement, TKey>(
  source: Iterable<TElement>,
  exclude: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): Iterable<TElement> {

  const exclusionSet = toSet(map(exclude, keySelector));

  return filter(source, (elem) => {
    const key = keySelector(elem);

    if (!exclusionSet.has(key)) {
      exclusionSet.add(key);
      return true;
    }

    return false;
  });
}
