import { take } from './take';
import { skip } from './skip';
import { iterable } from '../utils/iterable';
import { iterator } from '../utils/iterator';

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
    let index = 0;
    let toDelete = deleteCount;

    for (const element of source) {
      // if we are before start just yield
      if (index++ < start) {
        yield element;
        continue;
      }

      // start ignoring toDelete amount of elements
      if (toDelete-- === 0) {
        yield* items;
      } else {
        continue;
      }

      yield element;
    }

    // toDelete >= 0 when items should pe at the end
    if (toDelete >= 0) {
      yield* items;
    }
  });
}
