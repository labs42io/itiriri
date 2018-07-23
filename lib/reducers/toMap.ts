import { execute } from './execute';

export function toMap<TElement, TKey, TResult>(
  source: Iterable<TElement>,
  keySelector: (element: TElement, index: number) => TKey,
  valueSelector: (element: TElement, index: number) => TResult,
): Map<TKey, TResult> {

  const map = new Map<TKey, TResult>();

  execute(source, (e, idx) => {
    const key = keySelector(e, idx);
    if (map.has(key)) {
      throw new Error(`Duplicate map entry key: ${key}.`);
    }

    map.set(key, valueSelector(e, idx));
  });

  return map;
}
