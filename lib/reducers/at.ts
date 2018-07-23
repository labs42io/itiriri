import { filter } from '../iterators/filter';
import { first } from './first';

export function at<TElement>(source: Iterable<TElement>, index: number): TElement {
  return first(filter(source, (elem, idx) => idx === index));
}
