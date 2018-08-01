import { IterableQuery } from './IterableQuery';

/**
 * Apply a filter over an iterable and return a new iterable.
 */
export interface IterableFilter<T> extends Iterable<T> {
  /**
   * Returns a sequence of elements that pass the predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns Iterable<T>
   */
  filter(predicate: (element: T, index: number) => boolean): IterableQuery<T>;

  /**
   * Returns a specified number of elements from the beginning of sequence.
   * If a negative count is specified, returns elements from the end of the sequence.
   * @param  {number} count
   * @returns Iterable<T>
   */
  take(count: number): IterableQuery<T>;

  /**
   * Skips the specified number of elements from the beggining of sequence
   * and returns the remaining ones.
   * If a negative count is specified, skips elements from the end of the sequence.
   * @param  {number} count
   * @returns Iterable<T>
   */
  skip(count: number): IterableQuery<T>;

  /**
   * Returns a sequence that represents the range of elements from start to end.
   * @param start zero-based index at which to start extraction
   * @param end zero-based index before which to end extraction (not including)
   * @returns Iterable<T>
   */
  slice(start: number, end: number): IterableQuery<T>;

  /**
   * Returns a sequence that skips elements and/or adds new elements.
   * @param start index at which to start skip elements
   * @param deleteCount the number of elements to skip
   * @param items the elements to add at start index
   * @returns Iterable<T>
   */
  splice(start: number, deleteCount: number, ...items: T[]): IterableQuery<T>;
}
