import { execute } from './execute';

export function lastIndexOf<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): number {
  let index = -1;

  execute(source, (elem, idx) => {
    if (predicate(elem, idx)) index = idx;
  });

  return index;
}
