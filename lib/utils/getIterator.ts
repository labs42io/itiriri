export function getIterator<T>(source: Iterable<T>): Iterator<T> {
  return source[Symbol.iterator]();
}
