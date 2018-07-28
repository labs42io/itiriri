import { iterable } from '../utils/iterable';
import { map } from './map';

export function sort<TElement, TKey>(
  source: Iterable<TElement>,
  keySelector: (element: TElement, index: number) => TKey,
  descending = false,
): Iterable<TElement> {
  return iterable(() => {
    const indexed = indexElements(source, keySelector);
    const sorted = indexed.sort(descending ? desc : asc);

    return map(sorted, e => e.value);
  });
}

type SortElement<T, K> = { key: K, value: T, index: number };

function indexElements<TElement, TKey>(
  source: Iterable<TElement>,
  keySelector: (element: TElement, index: number) => TKey,
) {
  let index = 0;
  const indexed: SortElement<TElement, TKey>[] = [];

  for (const value of source) {
    indexed.push({
      value,
      index,
      key: keySelector(value, index++),
    });
  }

  return indexed;
}

function asc<T, K>(a: SortElement<T, K>, b: SortElement<T, K>) {
  if (a.key < b.key) return -1;
  if (a.key > b.key) return 1;
  return a.index - b.index;
}

function desc<T, K>(a: SortElement<T, K>, b: SortElement<T, K>) {
  return asc(b, a);
}
