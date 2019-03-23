export function average(source: Iterable<number>): number | undefined {
  let [s, n] = [0, 0];

  for (const element of source) {
    [s, n] = [s + element, n + 1];
  }

  return n > 0 ? s / n : undefined;
}
