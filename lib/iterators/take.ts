import { execute } from '../reducers/execute';
import { fromArray } from './fromArray';
import { fromGenerator } from './fromGenerator';
import { until } from './until';

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
  if (count === 0) {
    return fromArray([]);
  }

  if (count > 0) {
    return until(source, (elem, idx) => idx + 1 === count);
  }

  return takeLast(source, -count);
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
