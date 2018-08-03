import { IterableQuery } from './IterableQuery';

/**
 * Perform a permutation of elements to produce a new iterable.
 */
export interface IterablePermutation<T> extends Iterable<T> {
  /**
   * Returns a sequence of sorted elements.
   * @returns Iterable<T>
   */
  sort(): IterableQuery<T>;

  /**
   * Returns a sequence of sorted elements compared by a given comparer.
   * @param  {(element1:T, element2:T)=>number} compareFn comparer function
   * @returns Iterable<T>
   */
  sort(compareFn: (element1: T, element2: T) => number): IterableQuery<T>;

  /**
   * Returns the sequence of elements in a random order.
   */
  shuffle(): IterableQuery<T>;

  /**
   * Returns a sequence of elements in a reversed order.
   * @returns Iterable<T>
   */
  reverse(): IterableQuery<T>;
}
