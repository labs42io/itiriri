export function last<TElement>(source: Iterable<TElement>): TElement {
  let value = undefined;

  for (const element of source) {
    value = element;
  }

  return value;
}
