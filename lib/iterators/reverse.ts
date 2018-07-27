import { fromGenerator } from '../utils/fromGenerator';

export function reverse<TElement>(source: Iterable<TElement>) {
  return fromGenerator(() => {
    const elements: TElement[] = [];

    for (const element of source) {
      elements.unshift(element);
    }

    return elements;
  });
}
