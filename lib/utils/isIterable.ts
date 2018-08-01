export function isIterable<T>(item: any): item is Iterable<T> {
  return (<Iterable<T>>item)[Symbol.iterator] !== undefined;
}
