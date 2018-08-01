/**
 * Apply a predicate over an iterable.
 */
export interface IterablePredicate<T> extends Iterable<T> {
  /**
   * Tests whether all the elements pass the predicate.
   * @param  {(element:T, index:number)=>boolean} predicate element predicate
   * @returns boolean
   */
  every(predicate: (element: T, index: number) => boolean): boolean;

  /**
   * Tests whether at least one element passes the predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns boolean
   */
  some(predicate: (element: T, index: number) => boolean): boolean;

  /**
   * Determines whether the sequence includes a certain element.
   * @param  {T} element element to search
   */
  includes(element: T): boolean;
}
