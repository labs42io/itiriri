import { filter } from './filter';
import { fromGenerator } from './fromGenerator';
import { getIterator } from './getIterator';

export function skip<TElement>(
  source: Iterable<TElement>,
  count: number,
): Iterable<TElement> {
  return fromGenerator(() => generator(source, count));
}

function generator<TElement>(
  source: Iterable<TElement>,
  count: number,
): Iterable<TElement> {

  if (count >= 0) {
    return filter(source, (elem, idx) => idx >= count);
  }

  return skipLast(source, -count);
}

function* skipLast<TElement>(source: Iterable<TElement>, count: number) {
  const result: TElement[] = [];
  const buffer: TElement[] = [];
  let index = 0;

  const iterator = getIterator(source);
  let current = iterator.next();

  while (!current.done) {
    buffer.push(current.value);
    if (index - count > 0) {
      yield buffer.shift();
    }

    index += 1;
    current = iterator.next();
  }
}
