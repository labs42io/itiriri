import { toPartitions } from '../reducers/toPartitions';
import { iterable } from '../utils/iterable';

export function join<TLeft, TRight, TKey, TResult>(
  source: Iterable<TLeft>,
  others: Iterable<TRight>,
  leftKeySelector: (element: TLeft, index: number) => TKey,
  rightKeySelector: (element: TRight, index: number) => TKey,
  joinSelector: (left: TLeft, right: TRight) => TResult,
): Iterable<TResult> {
  return iterable(function* () {
    let index = 0;
    const rightMap = toPartitions(others, rightKeySelector, x => x);

    for (const element of source) {
      const leftKey = leftKeySelector(element, index++);

      if (rightMap.has(leftKey)) {
        for (const rightMatch of rightMap.get(leftKey)) {
          yield joinSelector(element, rightMatch);
        }
      }

    }
  });
}
