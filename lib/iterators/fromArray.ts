import { fromGenerator } from './fromGenerator';

export function fromArray<T>(source: T[]): Iterable<T> {
  return fromGenerator(() => generator(source));
}

function* generator<T>(source: T[]) {
  for (let i = 0, n = source.length; i < n; i++) {
    yield source[i];
  }
}
