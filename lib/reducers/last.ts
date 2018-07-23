import { execute } from './execute';

export function last<TElement>(source: Iterable<TElement>): TElement {
  let value = undefined;

  execute(source, (elem, idx) => value = elem);

  return value;
}
