
/**
 * A queryable collection representation.
 */
export interface Query<T> extends Iterable<T> {

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Scalar functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the element at a given index.
   * @param  {number} index element's index
   * @returns T
   */
  at(index: number): T;

  /**
   * Returns the first index at which a given element can be found. If not present, returns -1.
   * @param  {T} element element to search
   * @returns number
   */
  indexOf(element: T): number;

  /**
   * Returns the first index at which a given element matching the predicate can be found.
   * If not present, returns -1.
   * @param  {(element:T)=>boolean} predicate element predicate
   * @returns number
   */
  indexOf(predicate: (element: T) => boolean): number;

  /**
   * Returns the last index at which a given element can be found. If not present, returns -1.
   * @param  {T} element element to search
   * @returns number
   */
  lastIndexOf(element: T): number;

  /**
   * Returns the last index at which a given element matching the predicate can be found.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @returns number
   */
  lastIndexOf(predicate: (element: T) => boolean): number;

  /**
   * Returns the count of elements.
   * @returns number
   */
  count(): number;

  /**
   * Returns the count of elements matching a given predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns number
   */
  count(predicate: (element: T, index: number) => boolean): number;

  /**
  * Returns the first element.
  * @returns T
  */
  first(): T;

  /**
   * Returns the first element that satisfies a given predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns T
   */
  first(predicate: (element: T, index: number) => boolean): T;

  /**
   * Returns the last element.
   * @returns T
   */
  last(): T;

  /**
   * Returns the last element that satisfies a given predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns T
   */
  last(predicate: (element: T, index: number) => boolean): T;

  /**
   * Returns the average value.
   * @returns number
   */
  average(): number;

  /**
   * Invokes the transformation of elements with a given selector and returns the average value.
   * @param  {(element:T,index:number)=>number} selector element field selector
   * @returns number
   */
  average(selector: (element: T, index: number) => number): number;

  /**
   * Returns the minimum value.
   * @returns number
   */
  min(): number;

  /**
   * Invokes the transformation of elements with a given selector and returns the minimum value.
   * @param  {(element:T,index:number)=>number} selector element field selector
   * @returns number
   */
  min(selector: (element: T, index: number) => number): number;

  /**
   * Returns the maximum value.
   * @returns number
   */
  max(): number;

  /**
   * Invokes the transformation of elements with a given selector and returns the maximum value.
   * @param  {(element:T,index:number)=>number} selector element field selector
   * @returns number
   */
  max(selector: (element: T, index: number) => number): number;

  /**
   * Returns the sum of all elements.
   * @returns number
   */
  sum(): number;

  /**
   * Invokes the transformation of elements with a given selector and returns the sum of values.
   * @param  {(element:T,index:number)=>number} selector element field selector
   * @returns number
   */
  sum(selector: (element: T, index: number) => number): number;

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

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Predicate functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

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
   * Determines whether a given element is contained within current elements.
   * @param  {T} element element to search
   */
  contains(element: T): boolean;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Permutation functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a random permutation of elements.
   */
  shuffle(): Query<T>;

  /**
   * Reverses the order of elements.
   * @returns Query
   */
  reverse(): Query<T>;

  /**
   * Sorts the elements.
   * @returns Query
   */
  sort(): Query<T>;

  /**
   * Sorts the elements by a given field.
   * @param  {(element:T)=>S} selector field selector
   * @returns Query
   */
  sort<S>(selector: (element: T) => S): Query<T>;

  /**
   * Sorts the elements in a descending order.
   * @returns Query
   */
  sortDesc(): Query<T>;

  /**
   * Sorts the elements by a given field in a descending order.
   * @param  {(element:T)=>S} selector field selector
   * @returns Query
   */
  sortDesc<S>(selector: (element: T) => S): Query<T>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Filtering functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Returns unique elements.
   * @returns Query
   */
  distinct(): Query<T>;

  /**
   * Returns elements having unique field values.
   * @param  {(element:T)=>S} selector element field selector
   * @returns Query
   */
  distinct<S>(selector: (element: T) => S): Query<T>;

  /**
   * Returns a new query with elements that match the given predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns Query
   */
  filter(predicate: (element: T, index: number) => boolean): Query<T>;

  /**
   * Returns a specified number of elements from the beginning of sequence.
   * @param  {number} count
   * @returns Query
   */
  take(count: number): Query<T>;

  /**
   * Skips the specified number of elements from the beggining of sequence
   * and returns the remaining ones.
   * @param  {number} count
   * @returns Query
   */
  skip(count: number): Query<T>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Set functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a query with excluded items.
   * @param  {T[]} items items to exclude
   * @returns Query
   */
  except(items: T[]): Query<T>;

  /**
   * Returns a query with excluded items comparing by the given field selector.
   * @param  {T[]} items items to compare and exclude
   * @param  {(element: T)=>S} selector element field selector
   * @returns Query
   */
  except<S>(items: T[], selector: (element: T) => S): Query<T>;

  /**
   * Returns a query with excluded items from specified query.
   * @param  {Query<T>} query
   * @returns Query
   */
  except(query: Query<T>): Query<T>;

  /**
   * Returns a query with excluded items using a comparer function.
   * @param  {Query<T>} query query items to compare and exclude
   * @param  {(element: T)=>S} selector element field selector
   * true if elements match, false otherwise
   * @returns Query
   */
  except<S>(query: Query<T>, selector: (element: T) => S): Query<T>;

  /**
   * Returns a set intersection of elements with given items.
   * @param  {T[]} items
   * @returns Query
   */
  intersect(items: T[]): Query<T>;

  /**
   * Returns a set intersection of elements with given items using a field selector for comparisons.
   * @param  {T[]} items
   * @pa{(element: T)=>S} selector element field selector
   * @returns Query
   */
  intersect<S>(items: T[], selector: (element: T) => S): Query<T>;

  /**
   * Returns a set intersection of elements with given query.
   * @param  {Query<T>} query
   * @returns Query
   */
  intersect(query: Query<T>): Query<T>;

  /**
   * Returns a set intersection of elements with given query using a field selector for comparisons.
   * @param  {Query<T>} query
   * @param  {(element: T)=>S} selector element field selector
   * @returns Query
   */
  intersect<S>(query: Query<T>, selector: (element: T) => S): Query<T>;

  /**
   * Returns a set union of elements with given items.
   * @param  {T[]} items
   * @returns Query
   */
  union(items: T[]): Query<T>;

  /**
   * Returns a set union of elements with given items using a field selector for comparisons.
   * @param  {T[]} items
   * @pa{(element: T)=>S} selector element field selector
   * @returns Query
   */
  union<S>(items: T[], selector: (element: T) => S): Query<T>;

  /**
   * Returns a set union of elements with given query.
   * @param  {Query<T>} query
   * @returns Query
   */
  union(query: Query<T>): Query<T>;

  /**
   * Returns a set union of elements with given query using a field selector for comparisons.
   * @param  {Query<T>} query
   * @param  {(element: T)=>S} selector element field selector
   * @returns Query
   */
  union<S>(query: Query<T>, selector: (element: T) => S): Query<T>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Projection functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Projects each element into a new form.
   * @param  {(element:T,index:number)=>S} selector
   * @returns Query
   */
  map<S>(selector: (element: T, index: number) => S): Query<S>;

  /**
   * Projects each element of an array into a new form and flattens the result.
   * @param  {(element:T,index:number)=>S[]} selector
   * @returns Query
   */
  mapAll<S>(selector: (element: T, index: number) => S[]): Query<S>;

  /**
   * Projects each element of a query into a new form and flattens the result.
   * @param  {(element:T)=>Query<S>} selector
   * @returns Query
   */
  mapAll<S>(selector: (element: T, index: number) => Query<S>): Query<S>;

  /**
   * Runs through every element and applies a given function
   * @param  {(element:T,index:number)=>void} action action to apply on each element
   * @returns Query
   */
  forEach(action: (element: T, index: number) => void): Query<T>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Grouping functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Groups elements by a given key.
   * @param  {(element:T,index:number)=>K} keySelector key selector
   * @returns Query
   */
  groupBy<K>(
    keySelector: (element: T, index: number) => K): Query<QueryGroup<K, T>>;

  /**
   * Groups elements by a given key and applies a transformation on the grouped items.
   * @param  {(element:T,index:number)=>K} keySelector key selector
   * @param  {(element:T,index:number)=>E} valueSelector value selector
   * @returns Query
   */
  groupBy<K, E>(
    keySelector: (element: T, index: number) => K,
    valueSelector: (element: T, index: number) => E): Query<QueryGroup<K, E>>;

  /**
   * Correlates the elements with given items based on equality of keys and groups the results.
   * @param  {TRight[]} items
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  groupJoin<TKey, TRight, TResult>(
    items: TRight[],
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): Query<TResult>;

  /**
   * Correlates the elements with given query based on equality of keys and groups the results.
   * @param  {Query<TRight>} query
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  groupJoin<TKey, TRight, TResult>(
    query: Query<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): Query<TResult>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Joining functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Correlates the elements with given items based on equality of keys.
   * @param  {TRight[]} items
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  join<TKey, TRight, TResult>(
    items: TRight[],
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): Query<TResult>;

  /**
   * Correlates the elements with given query based on equality of keys.
   * @param  {Query<TRight>} query
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  join<TKey, TRight, TResult>(
    query: Query<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): Query<TResult>;

  /**
   * Correlates all the elements from current query with given items based on equality of keys.
   * @param  {TRight[]} items
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  leftJoin<TKey, TRight, TResult>(
    items: TRight[],
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): Query<TResult>;

  /**
   * Correlates all the elements from current query with given query based on equality of keys.
   * @param  {Query<TRight>} query
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left item key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right item key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector projection selector
   * @returns Query
   */
  leftJoin<TKey, TRight, TResult>(
    query: Query<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): Query<TResult>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Concatenation functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Concatenates the sequence with specified array.
   * @param  {T[]} items
   * @returns Query
   */
  concat(items: T[]): Query<T>;

  /**
 * Returns a new Query that contains the key/value for each value.
 * @returns Query
 */
  entries(): Query<[number, T]>;

  /**
   * Concatenates the sequence with specified query.
   * @param  {Query<T>} query
   * @returns Query
   */
  concat(query: Query<T>): Query<T>;

  /**
   * Adds items at the beggining of sequence.
   * @param  {T[]} items
   * @returns Query
   */
  prepend(items: T[]): Query<T>;

  /**
   * Adds query items at the beginning of query.
   * @param  {Query<T>} query
   * @returns Query
   */
  prepend(query: Query<T>): Query<T>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Transformation functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

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
   */
  toMapAll<M>(
    keySelector: (element: T, index: number) => M): Map<M, T[]>;

  /**
   * Returns a dictionary of key array values pairs by applying a trasformation on values.
   * @param  {(element:T)=>M} keySelector key selector
   * @param  {(element:T)=>N} valueSelector value selector
   * @returns Map
   */
  toMapAll<M, N>(
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
}

/**
 * A queryable collection group representation.
 */
export interface QueryGroup<K, T> extends Query<T> {
  /**
   * Current group key.
   */
  readonly key: K;
}
