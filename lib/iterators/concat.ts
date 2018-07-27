import { flatten } from './flatten';
import { fromGenerator } from './fromGenerator';

export function concat<TElement>(
  left: Iterable<TElement>,
  rigth: Iterable<TElement>,
): Iterable<TElement> {
  return fromGenerator(function* () {
    for (const element of left) {
      yield element;
    }

    for (const element of rigth) {
      yield element;
    }
  });
}
