export function indexOf<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): number {
  let index = -1;

  for (const element of source) {
    if (predicate(element, index++)) {
      return index;
    }
  }

  return -1;
}
