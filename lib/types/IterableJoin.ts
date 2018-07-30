import { IterableQuery } from './IterableQuery';

/**
 * Join two iterables to produce a new iterable.
 */
export interface IterableJoin<T> extends Iterable<T> {
  /**
   * Correlates the elements with given items based on equality of keys.
   * @param  {Iterable<TRight>} items
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  join<TKey, TRight, TResult>(
    items: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): IterableQuery<TResult>;

  /**
   * Correlates all the elements from current query with given items based on equality of keys.
   * @param  {Iterable<TRight>} items
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  leftJoin<TKey, TRight, TResult>(
    items: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): IterableQuery<TResult>;

  /**
   * Correlates all the elements from current query with given items based on equality of keys.
   * @param  {Iterable<TRight>} items
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  rightJoin<TKey, TRight, TResult>(
    items: Iterable<TRight>,
    rightKeySelector: (element: TRight, index: number) => TKey,
    leftKeySelector: (element: T, index: number) => TKey,
    joinSelector: (right: TRight, left?: T) => TResult,
  ): IterableQuery<TResult>;

  /**
   * Correlates the elements with given items based on equality of keys and groups the results.
   * @param  {Iterable<TRight>} items
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   * @todo review name
   */
  groupJoin<TKey, TRight, TResult>(
    items: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): IterableQuery<TResult>;
}
