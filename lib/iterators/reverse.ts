import { iterable } from '../utils/iterable';

export function reverse<TElement>(source: Iterable<TElement>) {
  return iterable(() => {
    const elements: TElement[] = [];

    for (const element of source) {
      elements.unshift(element);
    }

    return elements;
  });
}
