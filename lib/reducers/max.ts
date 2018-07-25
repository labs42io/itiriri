import { execute } from './execute';

export function max(source: Iterable<number>) {
  let m = -Number.MAX_VALUE;

  const hasItems = execute(source, (elem) => {
    if (elem > m) m = elem;
  });

  if (!hasItems) {
    return undefined;
  }

  return m;
}
