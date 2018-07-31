import { IterableCast } from './IterableCast';
import { IterableJoin } from './IterableJoin';
import { IterablePermutation } from './IterablePermutation';
import { IterablePredicate } from './IterablePredicate';
import { IterableFilter } from './IterableFilter';
import { IterableSet } from './IterableSet';
import { IterableTransformation } from './IterableTransformation';
import { IterableValue } from './IterableValue';

export interface IterableQuery<T> extends
  IterableValue<T>,
  IterablePredicate<T>,
  IterablePermutation<T>,
  IterableFilter<T>,
  IterableTransformation<T>,
  IterableSet<T>,
  IterableJoin<T>,
  IterableCast<T>,
  Iterable<T> {

  /**
   * Returns a sequence of key/value pair for each element and its index.
   * @returns Iterable<[number,T]>
   */
  entries(): IterableQuery<[number, T]>;

  /**
   * Returns a sequence of keys for each index in the source sequence.
   * @returns Iterable<number>
   */
  keys(): IterableQuery<number>;

  /**
   * Returns a sequence of values for each index in the source sequence.
   * @returns Iterable<T>
   */
  values(): IterableQuery<T>;

  /**
   * Concatenates the sequence with another one.
   * @param  {Iterable<T>} other
   * @returns Iterable<T>
   */
  concat(other: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a sequence with given elements at the beggining.
   * @param  {Iterable<T>} other
   * @returns Iterable<T>
   * @todo review name
   */
  prepend(other: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a sequence filled from a start index to an end index with a static value.
   * The end index is not included.
   * @param value value to fill
   * @param start start index, defaults to 0
   * @param end end index, defaults to sequence count
   * @returns Iterable<T>
   */
  fill(value: T): IterableQuery<T>;
  fill(value: T, start: number): IterableQuery<T>;
  fill(value: T, start: number, end: number): IterableQuery<T>;
}
