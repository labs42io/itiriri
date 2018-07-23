import { skip } from '../iterators/skip';
import { execute } from './execute';
import { first } from './first';

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

  let skippedCount = 0;
  let accumulator = initialValue;

  if (accumulator === undefined) {
    accumulator = first(source);

    if (accumulator === undefined) {
      throw new Error('Sequence contains no elements.');
    }

    skippedCount = 1;
  }

  execute(
    skip(source, skippedCount),
    (elem, idx) => accumulator = callback(accumulator, elem, idx + skippedCount));

  return accumulator;
}
