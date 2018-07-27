import { fromGenerator } from './fromGenerator';

export function fromArray<T>(source: T[]): Iterable<T> {
  return fromGenerator(() => generator(source));
}

function* generator<T>(source: T[]) {
  for (const element of source) {
    yield element;
  }
}
