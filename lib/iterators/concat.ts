import { flatten } from './flatten';
import { fromGenerator } from './fromGenerator';

export function concat<TElement>(
  left: Iterable<TElement>,
  rigth: Iterable<TElement>,
): Iterable<TElement> {
  return fromGenerator(() => generator(left, rigth));
}

function generator<TElement>(
  left: Iterable<TElement>,
  rigth: Iterable<TElement>,
): Iterable<TElement> {

  const src = function* () {
    yield left;
    yield rigth;
  };

  return flatten(src());
}
