export function reduce<TElement>(
  source: Iterable<TElement>,
  callback: (accumulator: TElement, current: TElement, index: number) => TElement,
): TElement;

export function reduce<TElement, TAccumulator>(
  source: Iterable<TElement>,
  callback: (accumulator: TAccumulator, current: TElement, index: number) => TAccumulator,
  initialValue: TAccumulator,
): TAccumulator;

export function reduce<TElement>(
  source: Iterable<TElement>,
  callback: (accumulator: any, current: TElement, index: number) => any,
  initialValue?: any,
): any {

  let [index, accumulator] = [-1, initialValue];

  for (const element of source) {
    accumulator = ++index === 0 && initialValue === undefined ?
      element :
      callback(accumulator, element, index);
  }

  if (initialValue === undefined && index === -1) {
    throw new Error('Sequence contains no elements.');
  }

  return accumulator;
}
