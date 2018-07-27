import { fromGenerator } from './fromGenerator';

export function map<TElement, TResult>(
  source: Iterable<TElement>,
  transform: (element: TElement, index: number) => TResult,
): Iterable<TResult> {
  return fromGenerator(() => generator(source, transform));
}

export function* generator<TElement, TResult>(
  source: Iterable<TElement>,
  transform: (element: TElement, index: number) => TResult,
): IterableIterator<TResult> {
  let index = 0;

  for (const element of source) {
    yield transform(element, index);
    index++;
  }
}
