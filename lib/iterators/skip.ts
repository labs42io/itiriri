import { filter } from './filter';
import { iterable } from '../utils/iterable';

export function skip<TElement>(
  source: Iterable<TElement>,
  count: number,
): Iterable<TElement> {
  return iterable(() => {
    return count >= 0 ?
      filter(source, (elem, idx) => idx >= count) :
      skipLast(source, -count);
  });
}

function* skipLast<TElement>(source: Iterable<TElement>, count: number) {
  const buffer: TElement[] = [];
  let index = 0;

  for (const element of source) {
    buffer.push(element);

    if (index++ - count >= 0) {
      yield buffer.shift();
    }
  }
}
