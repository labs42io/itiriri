import { execute } from './execute';

export function sum(source: Iterable<number>) {
  let s = 0;

  const hasItems = execute(source, elem => s += elem);

  if (!hasItems) {
    return undefined;
  }

  return s;
}
