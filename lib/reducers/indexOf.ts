export function indexOf<TElement>(
  source: Iterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): number {
  let index = 0;

  for (const element of source) {
    if (predicate(element, index)) {
      return index;
    }

    index++;
  }

  return -1;
}
