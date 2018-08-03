export function iterator<T>(source: Iterable<T>): Iterator<T> {
  return source[Symbol.iterator]();
}
