import { IterableQuery } from './IterableQuery';

/**
 * Apply a filter over an iterable and return a new iterable.
 */
export interface IterableFilter<T> extends Iterable<T> {
  /**
   * Returns elements that match the given predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns Query
   */
  filter(predicate: (element: T, index: number) => boolean): IterableQuery<T>;

  /**
   * Returns a specified number of elements from the beginning of sequence.
   * If a negative count is specified, returns elements from the end of the sequence.
   * @param  {number} count
   * @returns Query
   */
  take(count: number): IterableQuery<T>;

  /**
   * Skips the specified number of elements from the beggining of sequence
   * and returns the remaining ones.
   * If a negative count is specified, skips elements from the end of the sequence.
   * @param  {number} count
   * @returns Query
   */
  skip(count: number): IterableQuery<T>;

  /**
   * Returns a new sequence that represents the portion from begin to end.
   * @param begin zero-based index at which to begin extraction
   * @param end zero-based index before which to end extraction (not including)
   */
  slice(begin: number, end: number): IterableQuery<T>;

  /**
   * Returns a new query that skips elements and/or adds new elements.
   * @param start index at which to start skip elements
   * @param deleteCount the number of elements to skip
   * @param items the elements to add at start index
   */
  splice(start: number, deleteCount: number, ...items: T[]): IterableQuery<T>;
}
