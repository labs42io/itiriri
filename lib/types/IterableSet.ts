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
   * @param  {Iterable<T>} other element transformation
   * @returns Iterable<T>
   */
  exclude(other: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a sequence of unique elements not contained in a given sequence
   * using a transformation for value comparisons.
   * @param  {Iterable<T>} other items to compare and exclude
   * @param  {(element: T)=>S} selector element transformation
   * @returns Iterable<T>
   */
  exclude<S>(other: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a set intersection with a given sequence.
   * @param  {Iterable<T>} other
   * @returns Iterable<T>
   */
  intersect(other: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a set intersection with a given sequence using a transformation for comparisons.
   * @param  {Iterable<T>} other
   * @pa{(element: T)=>S} element transformation
   * @returns Iterable<T>
   */
  intersect<S>(other: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

  /**
   * Returns a set union with a given sequence.
   * @param  {Iterable<T>} other
   * @returns Iterable<T>
   */
  union(other: Iterable<T>): IterableQuery<T>;

  /**
   * Returns a set union with a given sequence using a transformation for comparisons.
   * @param  {Iterable<T>} other
   * @pa{(element: T)=>S} element transformation
   * @returns Iterable<T>
   */
  union<S>(other: Iterable<T>, selector: (element: T) => S): IterableQuery<T>;

}
