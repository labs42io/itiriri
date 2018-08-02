export function isIterable<T>(item: any): item is Iterable<T> {
  return typeof (<Iterable<T>>item)[Symbol.iterator] === 'function';
}
