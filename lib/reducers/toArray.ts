export function toArray<TElement>(source: Iterable<TElement>): TElement[] {
  const elements: TElement[] = [];

  for (const element of source) {
    elements.push(element);
  }

  return elements;
}
