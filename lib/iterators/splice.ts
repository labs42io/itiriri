import { take } from './take';
import { skip } from './skip';
import { iterable } from '../utils/iterable';

export function splice<TElement>(
  source: Iterable<TElement>,
  start: number,
  deleteCount: number,
  items: TElement[],
): Iterable<TElement> {
  if (start < 0) {
    throw new Error('Invalid start range, use positive index.');
  }

  if (deleteCount < 0) {
    throw new Error('Delete count can not be negative.');
  }

  return iterable(function* () {
    yield* take(source, start);
    yield* items;
    yield* skip(source, start + deleteCount);
  });
}
