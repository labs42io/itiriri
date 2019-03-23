import { iterable } from '../utils/iterable';

export function concat<TElement>(
  left: Iterable<TElement>,
  right: Iterable<TElement>,
): Iterable<TElement> {
  return iterable(function* () {
    yield* left;
    yield* right;
  });
}
