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
   * Returns a sequence of sorted elements compared by a given transformation.
   * @param  {(element:T)=>S} selector field selector
   * @returns Iterable<T>
   */
  sort<S>(selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a sequence of sorted elements in a descending order.
   * @returns Iterable<T>
   */
  sortDesc(): IterableQuery<T>;

  /**
   * Returns a sequence of sorted elements in a descending order
   * compared by a given transformation.
   * @param  {(element:T)=>S} selector field selector
   * @returns Iterable<T>
   */
  sortDesc<S>(selector: (element: T) => S): IterableQuery<T>;

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
