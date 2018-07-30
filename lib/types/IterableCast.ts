/**
 * Cast an iterable to a built-in type.
 */
export interface IterableCast<T> extends Iterable<T> {
  /**
   * Returns an array copy of current query.
   * @returns T
   */
  toArray(): T[];

  /**
   * Returns an array copy of projected values for current query.
   * @param  {(element:T,index:number)=>S} selector field selector
   * @returns S
   */
  toArray<S>(selector: (element: T, index: number) => S): S[];

  /**
     * Returns a dictionary of key value pairs.
     * @param  {(element:T)=>M} keySelector key selector
     * @returns Map
     */
  toMap<M>(
    keySelector: (element: T, index: number) => M): Map<M, T>;

  /**
   * Returns a dictionary of key value pairs by applying a trasformation on values.
   * @param  {(element:T)=>M} keySelector key selector
   * @param  {(element:T)=>N} valueSelector value selector
   * @returns Map
   */
  toMap<M, N>(
    keySelector: (element: T, index: number) => M,
    valueSelector: (element: T, index: number) => N): Map<M, N>;

  /**
   * Returns a dictionary of key array values pairs.
   * @param  {(element:T)=>M} keySelector key selector
   * @returns Map
   * @todo review name
   */
  toGroups<M>(
    keySelector: (element: T, index: number) => M): Map<M, T[]>;

  /**
   * Returns a dictionary of key array values pairs by applying a trasformation on values.
   * @param  {(element:T)=>M} keySelector key selector
   * @param  {(element:T)=>N} valueSelector value selector
   * @returns Map
   */
  toGroups<M, N>(
    keySelector: (element: T, index: number) => M,
    valueSelector: (element: T, index: number) => N): Map<M, N[]>;

  /**
   * Returns elements set.
   * @returns Set
   */
  toSet(): Set<T>;

  /**
   * Returns element projected values set.
   * @param  {(element:T,index:number)=>S} selector filed selector
   * @returns Set
   */
  toSet<S>(selector: (element: T, index: number) => S): Set<S>;

  /**
   * Returns a string representing the specified sequence and its elements.
   */
  toString(): string;
}
