export function toArray<TElement>(source: Iterable<TElement>): TElement[] {
  return Array.from(source);
}
