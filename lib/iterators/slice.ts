import { take } from './take';
import { skip } from './skip';

export function slice<TElement>(
  source: Iterable<TElement>,
  start?: number,
  end?: number,
): Iterable<TElement> {
  if (start === undefined && end === undefined) {
    return source;
  }

  if (start !== undefined && start < 0) {
    throw new Error('Invalid start range, use positive index.');
  }

  if (end !== undefined && end < 0) {
    throw new Error('Invalid end range, use positive index.');
  }

  // end !== undefined
  if (start === undefined) {
    return take(source, end);
  }

  // start !== undefined
  if (end === undefined) {
    return skip(source, start);
  }

  return skip(take(source, end), start);
}
