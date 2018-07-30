export function max(source: Iterable<number>): number {
  let [result, hasElements] = [-Number.MAX_VALUE, false];

  for (const element of source) {
    hasElements = true;
    if (element > result) result = element;
  }

  return hasElements ? result : undefined;
}
