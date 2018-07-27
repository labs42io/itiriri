import { toArray } from '../reducers/toArray';
import { fromGenerator } from './fromGenerator';

export function shuffle<TElement>(source: Iterable<TElement>): Iterable<TElement> {
  return fromGenerator(() => generator(source));
}

function generator<TElement>(source: Iterable<TElement>) {
  const elements = toArray(source);

  // Fisher–Yates shuffle
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }

  return elements;
}
