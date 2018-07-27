export function execute<TElement>(
  source: Iterable<TElement>,
  action: (element: TElement, index: number) => void,
): boolean {
  let index = 0;

  for (const element of source) {
    action(element, index);
    index++;
  }

  return index > 0;
}
