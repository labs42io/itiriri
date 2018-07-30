import { IterableQuery } from './IterableQuery';

/**
 * Perform a permutation of elements to produce a new iterable.
 */
export interface IterablePermutation<T> extends Iterable<T> {
  /**
   * Sorts the elements.
   * @returns Query
   */
  sort(): IterableQuery<T>;

  /**
   * Sorts the elements by a given field.
   * @param  {(element:T)=>S} selector field selector
   * @returns Query
   */
  sort<S>(selector: (element: T) => S): IterableQuery<T>;

  /**
   * Sorts the elements in a descending order.
   * @returns Query
   */
  sortDesc(): IterableQuery<T>;

  /**
   * Sorts the elements by a given field in a descending order.
   * @param  {(element:T)=>S} selector field selector
   * @returns Query
   */
  sortDesc<S>(selector: (element: T) => S): IterableQuery<T>;

  /**
   * Creates a random permutation of elements.
   */
  shuffle(): IterableQuery<T>;

  /**
   * Reverses the order of elements.
   * @returns Query
   */
  reverse(): IterableQuery<T>;
}
