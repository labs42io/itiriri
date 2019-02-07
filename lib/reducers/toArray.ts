export function toArray<TElement>(source: Iterable<TElement>): TElement[] {
  const a: TElement[] = [];

  for (const e of source) {
    a.push(e);
  }

  return a;
}
