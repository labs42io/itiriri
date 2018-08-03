import { iterable } from '../utils/iterable';

export function flat<T>(iterables: Iterable<Iterable<T>>): Iterable<T> {
  return iterable(function* () {
    for (const element of iterables) {
      yield* element;
    }
  });
}
