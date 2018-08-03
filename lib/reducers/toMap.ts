export function toMap<TElement, TKey, TResult>(
  source: Iterable<TElement>,
  keySelector: (element: TElement, index: number) => TKey,
  valueSelector: (element: TElement, index: number) => TResult,
): Map<TKey, TResult> {

  let index = 0;
  const map = new Map<TKey, TResult>();

  for (const element of source) {
    const key = keySelector(element, index);
    if (map.has(key)) {
      throw new Error(`Duplicate map entry key: ${key}.`);
    }

    map.set(key, valueSelector(element, index++));
  }

  return map;
}
