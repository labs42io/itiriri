import { IterableQuery } from './IterableQuery';

/**
 * Transform an iterable to a new iterable.
 */
export interface IterableTransformation<T> extends Iterable<T> {
  /**
   * Projects each element into a new form.
   * @param  {(element:T,index:number)=>S} selector
   * @returns Query
   */
  map<S>(selector: (element: T, index: number) => S): IterableQuery<S>;

  /**
   * Returns a new sequence with all sub-sequences concatenated.
   * @param  {(element:T,index:number)=>Iterable<S>} selector
   * @returns Query
   */
  flat<S>(selector: (element: T, index: number) => Iterable<S>): IterableQuery<S>;

  /**
   * Groups elements by a given key.
   * @param  {(element:T,index:number)=>K} keySelector key selector
   * @returns Query
   */
  groupBy<K>(
    keySelector: (element: T, index: number) => K): IterableQuery<IterableQueryGroup<K, T>>;

  /**
   * Groups elements by a given key and applies a transformation on the grouped items.
   * @param  {(element:T,index:number)=>K} keySelector key selector
   * @param  {(element:T,index:number)=>E} valueSelector value selector
   * @returns Query
   */
  groupBy<K, E>(
    keySelector: (element: T, index: number) => K,
    valueSelector: (element: T, index: number) => E): IterableQuery<IterableQueryGroup<K, E>>;
}

/**
 * A queryable collection group representation.
 */
export interface IterableQueryGroup<K, T> extends IterableQuery<T> {
  /**
   * Current group key.
   */
  readonly key: K;
}
