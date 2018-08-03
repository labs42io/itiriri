export function max<T>(
  source: Iterable<T>,
  compareFn: (element1: T, element2: T) => number = (e1: T, e2: T) => e1 > e2 ? 1 : -1,
): T {
  let result = undefined;

  for (const element of source) {
    if (result === undefined || compareFn(element, result) > 0) {
      result = element;
    }
  }

  return result;
}
