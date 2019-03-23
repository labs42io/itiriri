export function first<TElement>(source: Iterable<TElement>): TElement | undefined {
  for (const element of source) {
    return element;
  }

  return undefined;
}
