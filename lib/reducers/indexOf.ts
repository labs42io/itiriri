import { execute } from './execute';
import { until } from '../iterators/until';

export function indexOf<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): number {
  let index = -1;

  execute(until(source, predicate), (elem, idx) => index = idx);

  return index;
}
