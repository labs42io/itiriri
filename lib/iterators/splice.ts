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
    let index = 0;
    let toDelete = deleteCount;

    for (const element of source) {
      if (index++ < start) {
        yield element;
        continue;
      }

      if (toDelete-- === 0) {
        yield* items;
      }

      if (toDelete >= 0) {
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
