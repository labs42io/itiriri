import { map } from './map';

export function fill<T, TElement>(
  source: Iterable<TElement>,
  value: T,
  start?: number,
  end?: number,
): Iterable<T | TElement> {
  if (start === undefined && end === undefined) {
    return map(source, () => value);
  }

  if (end === undefined) {
    if (start < 0) {
      throw new Error('Invalid start range, use positive index');
    }

    return map(source, (elem, idx) => idx >= start ? value : elem);
  }

  if (end < 0) {
    throw new Error('Invalid start range, use positive index');
  }

  return map(source, (elem, idx) => idx >= start && idx <= end ? value : elem);
}
