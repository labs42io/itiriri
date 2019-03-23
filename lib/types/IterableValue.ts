/**
 * Calculate a scalar value over an iterable.
 */
export interface IterableValue<T> extends Iterable<T> {
  /**
   * Returns the element at a specified index.
   * For a negative index returns the element from the end of the sequence.
   * If index is out of the range, returns undefined.
   * @param  {number} index element's index
   * @returns T
   */
  nth(index: number): T | undefined;

  /**
   * Returns the first index at which a given element can be found.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @returns number
   */
  indexOf(element: T): number;

  /**
 * Returns the first index at which a given element can be found.
 * If not present, returns -1.
 * @param  {T} element element to search
 * @param fromIndex the start index
 * @returns number
 */
  indexOf(element: T, fromIndex: number): number;

  /**
   * Finds the first index at which a given element satisfies the specified predicate.
   * If not present, returns -1.
   * @param  {(element:T)=>boolean} predicate element predicate
   * @returns number
   */
  findIndex(predicate: (element: T, index: number) => boolean): number;

  /**
 * Returns the last index at which a given element can be found.
 * If not present, returns -1.
 * @param  {T} element element to search
 * @returns number
 */
  lastIndexOf(element: T): number;

  /**
   * Returns the last index at which a given element can be found.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @param fromIndex the start index
   * @returns number
   */
  lastIndexOf(element: T, fromIndex: number): number;

  /**
   * Finds the last index at which a given element satisfies the specified predicate.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @returns number
   */
  findLastIndex(predicate: (element: T, index: number) => boolean): number;

  /**
   * Returns the number of elements.
   * @returns number
   */
  length(): number;

  /**
   * Returns the number of elements matching the specified predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns number
   */
  length(predicate: (element: T, index: number) => boolean): number;

  /**
   * Returns the first element.
   * For an empty sequence returns undefined.
   * @returns T
   */
  first(): T | undefined;

  /**
   * Finds the first element that satisfies the specified predicate.
   * If no element satisfies the predicate, returns undefined.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns T
   */
  find(predicate: (element: T, index: number) => boolean): T | undefined;

  /**
   * Returns the last element.
   * For an empty sequence returns undefined.
   * @returns T
   */
  last(): T | undefined;

  /**
   * Finds the last element that satisfies the specified predicate.
   * If no element satisfies the predicate, returns undefined.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns T
   */
  findLast(predicate: (element: T, index: number) => boolean): T | undefined;

  /**
   * Returns the average value.
   * If sequence is empty, returns undefined.
   * @returns number
   */
  average(): number | undefined;

  /**
   * Returns the average value over a sequence of transformed values.
   * If sequence is empty, returns undefined.
   * @param  {(element:T,index:number)=>number} selector element transformation
   * @returns number
   */
  average(selector: (element: T, index: number) => number): number | undefined;

  /**
   * Returns the minimum value.
   * If sequence is empty, returns undefined.
   * @returns T
   */
  min(): T | undefined;

  /**
   * Returns the minimum value from a sequence using a comparer function.
   * If sequence is empty, returns undefined.
   * @param  {(element1:T,element2:T)=>number} compareFn comparer function that returns -1
   * for element1<element2, 1 for element1>element2, 0 for equal values
   * @returns T
   */
  min(compareFn: (element1: T, element2: T) => number): T | undefined;

  /**
   * Returns the maximum value.
   * If sequence is empty, returns undefined.
   * @returns T
   */
  max(): T | undefined;

  /**
   * Returns the maximum value from a sequence using a compare function.
   * If sequence is empty, returns undefined.
  * @param  {(element1:T,element2:T)=>number} compareFn comparer function that returns -1
   * for element1<element2, 1 for element1>element2, 0 for equal values
   * @returns T
   */
  max(compareFn: (element1: T, element2: T) => number): T | undefined;

  /**
   * Returns the sum of all elements.
   * If sequence is empty, returns undefined.
   * @returns number
   */
  sum(): number | undefined;

  /**
   * Returns the sum of elements from a sequence of transformed values.
   * If sequence is empty, returns undefined.
   * @param  {(element:T,index:number)=>number} selector element transformation
   * @returns number
   */
  sum(selector: (element: T, index: number) => number): number | undefined;

  /**
   * Applies a function against an accumulator and each element to reduce it to a single value
   * (from left to right).
   * @param  {(accumulator:TResult,current:T,index:number)=>TResult} callback accumulator function
   * @returns TResult
   */
  reduce(
    callback: (accumulator: T, current: T, index: number) => T,
  ): T;

  /**
   * Applies a function against an accumulator and each element to reduce it to a single value
   * (from left to right).
   * @param  {(accumulator:S,current:T,index:number)=>S} callback accumulator function
   * @param  {S} initialValue initial value
   * @returns S
   */
  reduce<S>(
    callback: (accumulator: S, current: T, index: number) => S,
    initialValue: S,
  ): S;

  /**
   * Applies a function against an accumulator and each element to reduce it to a single value
   * (from rigth to left).
   * @param  {(accumulator:TResult,current:T,index:number)=>TResult} callback accumulator function
   * @returns TResult
   */
  reduceRight<S, TResult>(
    callback: (accumulator: TResult, current: T, index: number) => TResult,
  ): TResult;

  /**
   * Applies a function against an accumulator and each element to reduce it to a single value
   * (from rigth to left).
   * @param  {(accumulator:S,current:T,index:number)=>S} callback accumulator function
   * @param  {S} initialValue initial value
   * @returns S
   */
  reduceRight<S>(
    callback: (accumulator: S, current: T, index: number) => S,
    initialValue: S,
  ): S;

  /**
   * Runs through every element and applies a given function.
   * @param  {(element:T,index:number)=>void} action function to apply on each element
   * @returns void
   */
  forEach(action: (element: T, index: number) => void): void;
}
