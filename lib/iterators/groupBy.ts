import { toMapAll } from '../reducers/toMapAll';
import { fromArray } from './fromArray';
import { fromGenerator } from './fromGenerator';

export function groupBy<TElement, TKey, TResult>(
  source: Iterable<TElement>,
  keySelector: (element: TElement, index: number) => TKey,
  valueSelector: (element: TElement, index: number) => TResult,
): Iterable<[TKey, Iterable<TResult>]> {
  return fromGenerator(() => toMapAll(source, keySelector, valueSelector));
}
