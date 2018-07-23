import { execute } from './execute';

export function toArray<TElement>(source: Iterable<TElement>): TElement[] {
  const elements: TElement[] = [];
  execute(source, elem => elements.push(elem));

  return elements;
}
