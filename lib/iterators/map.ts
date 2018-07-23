import { fromGenerator } from './fromGenerator';
import { getIterator } from './getIterator';

export function map<TElement, TResult>(
  source: Iterable<TElement>,
  transform: (element: TElement, index: number) => TResult,
): Iterable<TResult> {
  return fromGenerator(() => generator(source, transform));
}

export function* generator<TElement, TResult>(
  source: Iterable<TElement>,
  transform: (element: TElement, index: number) => TResult,
): IterableIterator<TResult> {

  const iterator = getIterator(source);
  let current = iterator.next();
  let index = 0;

  while (!current.done) {
    yield transform(current.value, index);

    index += 1;
    current = iterator.next();
  }
}
