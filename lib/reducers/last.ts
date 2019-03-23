export function last<TElement>(source: Iterable<TElement>): TElement | undefined {
  let value: TElement | undefined = undefined;

  for (const element of source) {
    value = element;
  }

  return value;
}
