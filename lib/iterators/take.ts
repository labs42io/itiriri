import { fromGenerator } from '../utils/fromGenerator';

export function take<TElement>(
  source: Iterable<TElement>,
  count: number,
): Iterable<TElement> {
  return count >= 0 ?
    fromGenerator(() => takeFirst(source, count)) :
    fromGenerator(() => takeLast(source, -count));
}

function* takeFirst<TElement>(source: Iterable<TElement>, count: number) {
  let n = count;

  for (const element of source) {
    if (n-- === 0) return;

    yield element;
  }
}

function* takeLast<TElement>(source: Iterable<TElement>, count: number) {
  const result: TElement[] = [];

  for (const element of source) {
    if (result.length === count) {
      result.shift();
    }

    result.push(element);
  }

  for (const element of result) {
    yield element;
  }
}
