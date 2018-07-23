import { execute } from './execute';

export function average(source: Iterable<number>): number {
  let s = 0;
  let n = 0;

  execute(source, elem => [s, n] = [s + elem, n + 1]);

  if (n === 0) {
    throw new Error('Sequence contains no elements.');
  }

  return s / n;
}
