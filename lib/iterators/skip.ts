import { filter } from './filter';
import { fromGenerator } from './fromGenerator';

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
  const buffer: TElement[] = [];
  let index = 0;

  for (const element of source) {
    buffer.push(element);

    if (index - count >= 0) {
      yield buffer.shift();
    }

    index++;
  }
}
