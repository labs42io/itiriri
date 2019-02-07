export function toGroups<TElement, TKey, TResult>(
  source: Iterable<TElement>,
  keySelector: (element: TElement, index: number) => TKey,
  valueSelector: (element: TElement, index: number) => TResult,
): Map<TKey, TResult[]> {

  let index = 0;
  const map = new Map<TKey, TResult[]>();

  for (const element of source) {
    const key = keySelector(element, index);
    const value = valueSelector(element, index++);
    const values = map.get(key);

    if (values !== undefined) {
      values.push(value);
    } else {
      map.set(key, [value]);
    }
  }

  return map;
}
