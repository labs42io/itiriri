import { IterableQuery } from './IterableQuery';

/**
 * Produce a new iterable that is a set iterable of unique elements.
 */
export interface IterableSet<T> extends Iterable<T> {
  /**
   * Returns unique elements.
   * @returns Query
   */
  distinct(): IterableQuery<T>;

  /**
   * Returns elements only having unique field values.
   * @param  {(element:T)=>S} selector element field selector
   * @returns Query
   */
  distinct<S>(selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a query with excluded items.
   * @param  {Iterable<T>} items items to exclude
   * @returns Query
   */
  exclude(items: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a query with excluded items comparing by the given field selector.
   * @param  {Iterable<T>} items items to compare and exclude
   * @param  {(element: T)=>S} selector element field selector
   * @returns Query
   */
  exclude<S>(items: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a set intersection with a given sequence.
   * @param  {Iterable<T>} items
   * @returns Query
   */
  intersect(items: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a set intersection with a given sequence using a field selector for comparisons.
   * @param  {Iterable<T>} items
   * @pa{(element: T)=>S} selector element field selector
   * @returns Query
   */
  intersect<S>(items: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a set union with a given sequence.
   * @param  {Iterable<T>} items
   * @returns Query
   */
  union(items: Iterable<T>): IterableQuery<T>;

  /**
   *Returns a set union with a given sequence using a field selector for comparisons.
   * @param  {Iterable<T>} items
   * @pa{(element: T)=>S} selector element field selector
   * @returns Query
   */
  union<S>(items: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

}
