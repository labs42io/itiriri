export function length<TElement>(source: Iterable<TElement>): number {
  let cnt = 0;

  for (const element of source) {
    cnt++;
  }

  return cnt;
}
