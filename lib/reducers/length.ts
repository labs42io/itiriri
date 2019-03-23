export function length<TElement>(source: Iterable<TElement>): number {
  let cnt = 0;

  for (const _ of source) {
    cnt++;
  }

  return cnt;
}
