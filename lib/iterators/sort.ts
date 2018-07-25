import { toArray } from '../reducers/toArray';
import { fromArray } from './fromArray';
import { fromGenerator } from './fromGenerator';
import { map } from './map';

export function sort<TElement, TKey>(
  source: Iterable<TElement>,
  keySelector: (element: TElement, index: number) => TKey,
  descending = false,
): Iterable<TElement> {
  return fromGenerator(() => generator(source, keySelector, descending));
}

function generator<TElement, TKey>(
  source: Iterable<TElement>,
  keySelector: (element: TElement, index: number) => TKey,
  descending = false,
): Iterable<TElement> {

  const indexedElements = map(
    source,
    (value, index) => (<SortElement<TElement, TKey>>{
      value,
      index,
      key: keySelector(value, index),
    }));

  const elements = !descending ?
    toArray(indexedElements).sort(comparer) :
    toArray(indexedElements).sort((a, b) => comparer(b, a));

  return map(fromArray(elements), e => e.value);
}

type SortElement<T, K> = { key: K, value: T, index: number };

function comparer<T, K>(a: SortElement<T, K>, b: SortElement<T, K>) {
  const valueA = a.key;
  const valueB = b.key;

  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return a.index - b.index;
}
