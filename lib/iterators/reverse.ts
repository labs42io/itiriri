import { execute } from '../reducers/execute';
import { fromGenerator } from './fromGenerator';

export function reverse<TElement>(source: Iterable<TElement>) {
  return fromGenerator(() => generator(source));
}

export function generator<TElement>(source: Iterable<TElement>) {
  const elements = [];
  execute(source, (elem, idx) => elements.unshift(elem));

  return elements;
}
