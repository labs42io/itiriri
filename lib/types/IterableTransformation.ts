import { IterableQuery } from './IterableQuery';

/**
 * Transform an iterable to a new iterable.
 */
export interface IterableTransformation<T> extends Iterable<T> {
  /**
   * Returns a sequence of transformed values.
   * @param  {(element:T,index:number)=>S} selector element transformation
   * @returns Iterable<T>
   */
  map<S>(selector: (element: T, index: number) => S): IterableQuery<S>;

  /**
   * Returns a sequence with all sub-sequences concatenated.
   * @param  {(element:T,index:number)=>Iterable<S>} selector sub-sequence
   * @returns Iterable<T>
   */
  flat<S>(selector: (element: T, index: number) => Iterable<S>): IterableQuery<S>;

  /**
   * Groups elements by a given key.
   * @param  {(element:T,index:number)=>K} keySelector key selector
   * @returns Iterable<T>
   */
  groupBy<K>(
    keySelector: (element: T, index: number) => K): IterableQuery<IterableQueryGroup<K, T>>;

  /**
   * Groups elements by a given key and applies a transformation over the elements.
   * @param  {(element:T,index:number)=>K} keySelector key selector
   * @param  {(element:T,index:number)=>E} valueSelector element transformation
   * @returns Iterable<T>
   */
  groupBy<K, E>(
    keySelector: (element: T, index: number) => K,
    valueSelector: (element: T, index: number) => E): IterableQuery<IterableQueryGroup<K, E>>;
}

/**
 * An iterable group representation.
 */
export interface IterableQueryGroup<K, T> extends IterableQuery<T> {
  /**
   * Current group key.
   */
  readonly key: K;
}
