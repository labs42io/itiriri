export function first<TElement>(source: Iterable<TElement>): TElement {
  for (const element of source) {
    return element;
  }

  return undefined;
}
