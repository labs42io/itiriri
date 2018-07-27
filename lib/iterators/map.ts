import { fromGenerator } from '../utils/fromGenerator';

export function map<TElement, TResult>(
  source: Iterable<TElement>,
  transform: (element: TElement, index: number) => TResult,
): Iterable<TResult> {
  return fromGenerator(function* () {
    let index = 0;

    for (const element of source) {
      yield transform(element, index++);
    }
  });
}
