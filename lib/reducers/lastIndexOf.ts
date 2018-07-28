export function lastIndexOf<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): number {
  let [result, index] = [-1, -1];

  for (const element of source) {
    if (predicate(element, ++index)) {
      result = index;
    }
  }

  return result;
}
