import { fromGenerator } from '../utils/fromGenerator';

export function concat<TElement>(
  left: Iterable<TElement>,
  rigth: Iterable<TElement>,
): Iterable<TElement> {
  return fromGenerator(function* () {
    yield* left;
    yield* rigth;
  });
}
