import { execute } from '../reducers/execute';
import { fromArray } from './fromArray';
import { fromGenerator } from './fromGenerator';
import { getIterator } from './getIterator';

export function take<TElement>(
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
    return fromGenerator(() => takeFirst(source, count));
  }

  return takeLast(source, -count);
}

function* takeFirst<TElement>(source: Iterable<TElement>, count: number) {
  const iterator = getIterator(source);
  let current = iterator.next();
  let n = count;

  while (n-- && !current.done) {
    yield current.value;

    current = iterator.next();
  }
}

function takeLast<TElement>(source: Iterable<TElement>, count: number) {
  const result: TElement[] = [];

  execute(source, (elem, idx) => {
    if (result.length === count) {
      result.shift();
    }

    result.push(elem);
  });

  return fromArray(result);
}
