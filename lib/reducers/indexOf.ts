import { execute } from './execute';
import { until } from '../iterators/until';

export function indexOf<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): number {
  let index = -1;

  // @TODO (break when element is found)
  execute(source, (elem, idx) => {
    if (predicate(elem, idx) && index === -1) {
      index = idx;
    }
  });

  return index;
}
