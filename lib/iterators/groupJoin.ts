import { toMapAll } from '../reducers/toMapAll';
import { flatten } from './flatten';
import { fromGenerator } from './fromGenerator';
import { map } from './map';

export function groupJoin<TLeft, TRight, TKey, TResult>(
  source: Iterable<TLeft>,
  others: Iterable<TRight>,
  leftKeySelector: (element: TLeft, index: number) => TKey,
  rightKeySelector: (element: TRight, index: number) => TKey,
  joinSelector: (left: TLeft, right: TRight[]) => TResult,
): Iterable<TResult> {
  return fromGenerator(() =>
    generator(source, others, leftKeySelector, rightKeySelector, joinSelector));
}

function generator<TLeft, TRight, TKey, TResult>(
  source: Iterable<TLeft>,
  others: Iterable<TRight>,
  leftKeySelector: (element: TLeft, index: number) => TKey,
  rightKeySelector: (element: TRight, index: number) => TKey,
  joinSelector: (left: TLeft, right: TRight[]) => TResult,
): Iterable<TResult> {

  const leftMap = toMapAll(source, leftKeySelector, x => x);
  const rightMap = toMapAll(others, rightKeySelector, x => x);

  const result = map(leftMap, ([leftKey, leftValues]) => {
    const rightValues = rightMap.get(leftKey);
    return map(
      leftValues,
      leftValue => joinSelector(leftValue, rightValues || []));
  });

  return flatten<TResult>(result);
}
