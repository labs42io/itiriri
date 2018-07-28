export function toSet<TElement>(source: Iterable<TElement>): Set<TElement> {
  return new Set<TElement>(source);
}
