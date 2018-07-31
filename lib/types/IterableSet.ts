import { IterableQuery } from './IterableQuery';

/**
 * Produce a new iterable that is a set iterable of unique elements.
 */
export interface IterableSet<T> extends Iterable<T> {
  /**
   * Returns a sequence of unique elements.
   * @returns Iterable<T>
   */
  distinct(): IterableQuery<T>;

  /**
   * Returns a sequence of unique element transformations.
   * @param  {(element:T)=>S} selector element transformation
   * @returns Iterable<T>
   */
  distinct<S>(selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a sequence of unique elements not contained in a given sequence.
   * @param  {Iterable<T>} others element transformation
   * @returns Iterable<T>
   */
  exclude(others: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a sequence of unique elements not contained in a given sequence
   * using a transformation for value comparisons.
   * @param  {Iterable<T>} others items to compare and exclude
   * @param  {(element: T)=>S} selector element transformation
   * @returns Iterable<T>
   */
  exclude<S>(others: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a set intersection with a given sequence.
   * @param  {Iterable<T>} others
   * @returns Iterable<T>
   */
  intersect(others: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a set intersection with a given sequence using a transformation for comparisons.
   * @param  {Iterable<T>} others
   * @pa{(element: T)=>S} element transformation
   * @returns Iterable<T>
   */
  intersect<S>(others: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a set union with a given sequence.
   * @param  {Iterable<T>} others
   * @returns Iterable<T>
   */
  union(others: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a set union with a given sequence using a transformation for comparisons.
   * @param  {Iterable<T>} others
   * @pa{(element: T)=>S} element transformation
   * @returns Iterable<T>
   */
  union<S>(others: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

}
