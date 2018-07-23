import { toSet } from '../reducers/toSet';
import { filter } from './filter';
import { fromGenerator } from './fromGenerator';
import { map } from './map';

export function intersect<TElement, TKey>(
  source: Iterable<TElement>,
  others: Iterable<TElement>,
  selector: (element: TElement) => TKey,
): Iterable<TElement> {
  return fromGenerator(() => generator(source, others, selector));
}

function generator<TElement, TKey>(
  source: Iterable<TElement>,
  others: Iterable<TElement>,
  selector: (element: TElement) => TKey,
): Iterable<TElement> {

  const includedSet = new Set<TKey>();
  const othersSet = toSet(map(others, selector));

  return filter(source, (elem) => {
    const key = selector(elem);

    if (includedSet.has(key)) {
      return false;
    }

    if (othersSet.has(key)) {
      includedSet.add(key);
      return true;
    }

    return false;
  });
}
