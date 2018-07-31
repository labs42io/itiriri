/**
 * Cast an iterable to a built-in type.
 */
export interface IterableCast<T> extends Iterable<T> {
  /**
   * Creates an array copy of the sequence.
   * @returns T[]
   */
  toArray(): T[];

  /**
   * Creates an array copy of transformed values of the sequence.
   * @param  {(element:T,index:number)=>S} selector element transformation
   * @returns S[]
   */
  toArray<S>(selector: (element: T, index: number) => S): S[];

  /**
   * Creates a map of elements by a given key.
   * @param  {(element:T)=>M} keySelector key selector
   * @returns Map<M,N>
   */
  toMap<M>(
    keySelector: (element: T, index: number) => M): Map<M, T>;

  /**
   * Creates a map of transformed elements by a given key.
   * @param  {(element:T)=>M} keySelector key selector
   * @param  {(element:T)=>N} valueSelector element transformation
   * @returns Map<M,N>
   */
  toMap<M, N>(
    keySelector: (element: T, index: number) => M,
    valueSelector: (element: T, index: number) => N): Map<M, N>;

  /**
   * Creates a map of element groups by a given key.
   * @param  {(element:T)=>M} keySelector key selector
   * @returns Map<M,T[]>
   * @todo review name
   */
  toGroups<M>(
    keySelector: (element: T, index: number) => M): Map<M, T[]>;

  /**
   * Creates a map of transformed element groups by a given key.
   * @param  {(element:T)=>M} keySelector key selector
   * @param  {(element:T)=>N} valueSelector element transformation
   * @returns Map<M,N[]>
   */
  toGroups<M, N>(
    keySelector: (element: T, index: number) => M,
    valueSelector: (element: T, index: number) => N): Map<M, N[]>;

  /**
   * Creates a set of elements.
   * @returns Set<T>
   */
  toSet(): Set<T>;

  /**
   * Creates a set of transformed values.
   * @param  {(element:T,index:number)=>S} selector element transformation
   * @returns Set<T>
   */
  toSet<S>(selector: (element: T, index: number) => S): Set<S>;

  /**
   * Returns a string representing the specified sequence and its elements.
   */
  toString(): string;
}
