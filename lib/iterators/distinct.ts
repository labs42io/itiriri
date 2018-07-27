import { filter } from './filter';
import { fromGenerator } from '../utils/fromGenerator';

export function distinct<TElement, TKey>(
  source: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): Iterable<TElement> {
  return fromGenerator(() => generator(source, keySelector));
}

function generator<TElement, TKey>(
  source: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): Iterable<TElement> {

  const set = new Set<TKey>();

  return filter(source, (elem, idx) => {
    const key = keySelector(elem);

    if (!set.has(key)) {
      set.add(key);
      return true;
    }

    return false;
  });
}
