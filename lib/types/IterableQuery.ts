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
   * Returns a new Query that contains the key/value pair for each element and its index.
   * @returns Query
   */
  entries(): IterableQuery<[number, T]>;

  /**
   * Returns a new Query that contains the keys for each index in the sequence.
   * @returns Query
   */
  keys(): IterableQuery<number>;

  /**
   * Returns a new Query that contains the values for each index in the sequence.
   * @returns Query
   */
  values(): IterableQuery<T>;

  /**
   * Runs through every element and applies a given function
   * @param  {(element:T,index:number)=>void} action action to apply on each element
   * @returns Query
   */
  forEach(action: (element: T, index: number) => void): IterableQuery<T>;

  /**
   * Concatenates the sequence with specified array.
   * @param  {Iterable<T>} items
   * @returns Query
   */
  concat(items: Iterable<T>): IterableQuery<T>;

  /**
   * Adds items at the beggining of sequence.
   * @param  {Iterable<T>} items
   * @returns Query
   * @todo review name
   */
  prepend(items: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a new query filled from a start index to an end index with a static value.
   * The end index is not included.
   * @param value value to fill
   * @param start start index, defaults to 0
   * @param end end index, defaults to sequence count
   * @returns Query
   */
  fill(value: T, start?: number, end?: number): IterableQuery<T>;
}
