import { execute } from './execute';

export function count<TElement>(source: Iterable<TElement>): number {
  let cnt = 0;
  execute(source, (elem, idx) => cnt += 1);

  return cnt;
}
