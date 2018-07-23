import { execute } from './execute';

export function max(source: Iterable<number>) {
  let m = Number.MIN_VALUE;

  const hasItems = execute(source, (elem) => {
    if (elem > m) m = elem;
  });

  if (!hasItems) {
    throw new Error('Sequence contains no elements.');
  }

  return m;
}
