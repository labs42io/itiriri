/**
 * Apply a predicate over an iterable.
 */
export interface IterablePredicate<T> extends Iterable<T> {
  /**
   * Determines whether all elements satisfy the given predicate.
   * @param  {(element:T, index:number)=>boolean} predicate element predicate
   * @returns boolean
   */
  every(predicate: (element: T, index: number) => boolean): boolean;

  /**
   * Determines whether any element satisfies the given predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns boolean
   */
  some(predicate: (element: T, index: number) => boolean): boolean;

  /**
   * Determines whether a given element is contained within the sequence.
   * @param  {T} element element to search
   */
  includes(element: T): boolean;
}
