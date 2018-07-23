import { getIterator } from '../iterators/getIterator';

export function execute<TElement>(
  source: Iterable<TElement>,
  action: (element: TElement, index: number) => void,
): boolean {
  const iterator = getIterator(source);

  let index = 0;
  let current = iterator.next();

  while (!current.done) {
    action(current.value, index);

    index += 1;
    current = iterator.next();
  }

  return index > 0;
}
