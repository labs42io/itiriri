/**
 * A queryable collection representation.
 */
export interface Query<T> extends Iterable<T> {

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Scalar functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the element at a specified index.
   * For a negative index returns the element from the end of the iterable.
   * If index is out of the range, returns undefined.
   * @param  {number} index element's index
   * @returns T
   * @todo review name
   */
  at(index: number): T;

  /**
   * Returns the first index at which a given element can be found.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @returns number
   */
  indexOf(element: T): number;

  /**
   * Finds the first index at which a given element satisfies the specified predicate.
   * If not present, returns -1.
   * @param  {(element:T)=>boolean} predicate element predicate
   * @returns number
   */
  findIndex(predicate: (element: T) => boolean): number;

  /**
   * Returns the last index at which a given element can be found.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @returns number
   */
  lastIndexOf(element: T): number;

  /**
   * Finds the last index at which a given element satisfies the specified predicate.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @returns number
   */
  findLastIndex(predicate: (element: T) => boolean): number;

  /**
   * Returns the count of elements.
   * @returns number
   */
  count(): number;

  /**
   * Returns the count of elements matching the specified predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns number
   */
  count(predicate: (element: T, index: number) => boolean): number;

  /**
   * Returns the first element.
   * For an empty sequence returns undefined.
   * @returns T
   */
  first(): T;

  /**
   * Finds the first element that satisfies the specified predicate.
   * If no elements satisfies the predicate, returns undefined.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns T
   */
  find(predicate: (element: T, index: number) => boolean): T;

  /**
   * Returns the last element.
   * @returns T
   */
  last(): T;

  /**
   * Finds the last element that satisfies the specified predicate.
   * If no elements satisfies the predicate, returns undefined.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns T
   */
  findLast(predicate: (element: T, index: number) => boolean): T;

  /**
   * Returns the average value.
   * If sequence is empty, returns undefined.
   * @returns number
   */
  average(): number;

  /**
   * Invokes the transformation of elements with a given selector and returns the average value.
   * If sequence is empty, returns undefined.
   * @param  {(element:T,index:number)=>number} selector element field selector
   * @returns number
   */
  average(selector: (element: T, index: number) => number): number;

  /**
   * Returns the minimum value.
   * If sequence is empty, returns undefined.
   * @returns number
   */
  min(): number;

  /**
   * Invokes the transformation of elements with a given selector and returns the minimum value.
   * If sequence is empty, returns undefined.
   * @param  {(element:T,index:number)=>number} selector element field selector
   * @returns number
   */
  min(selector: (element: T, index: number) => number): number;

  /**
   * Returns the maximum value.
   * If sequence is empty, returns undefined.
   * @returns number
   */
  max(): number;

  /**
   * Invokes the transformation of elements with a given selector and returns the maximum value.
   * If sequence is empty, returns undefined.
   * @param  {(element:T,index:number)=>number} selector element field selector
   * @returns number
   */
  max(selector: (element: T, index: number) => number): number;

  /**
   * Returns the sum of all elements.
   * If sequence is empty, returns undefined.
   * @returns number
   */
  sum(): number;

  /**
   * Invokes the transformation of elements with a given selector and returns the sum of values.
   * If sequence is empty, returns undefined.
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
   * Determines whether a given element is contained within the sequence.
   * @param  {T} element element to search
   */
  includes(element: T): boolean;

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
   * Returns elements only having unique field values.
   * @param  {(element:T)=>S} selector element field selector
   * @returns Query
   */
  distinct<S>(selector: (element: T) => S): Query<T>;

  /**
   * Returns elements that match the given predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns Query
   */
  filter(predicate: (element: T, index: number) => boolean): Query<T>;

  /**
   * Returns a specified number of elements from the beginning of sequence.
   * If a negative count is specified, returns elements from the end of the sequence.
   * @param  {number} count
   * @returns Query
   */
  take(count: number): Query<T>;

  /**
   * Skips the specified number of elements from the beggining of sequence
   * and returns the remaining ones.
   * If a negative count is specified, skips elements from the end of the sequence.
   * @param  {number} count
   * @returns Query
   */
  skip(count: number): Query<T>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Set functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a query with excluded items.
   * @param  {Iterable<T>} items items to exclude
   * @returns Query
   */
  exclude(items: Iterable<T>): Query<T>;

  /**
   * Returns a query with excluded items comparing by the given field selector.
   * @param  {Iterable<T>} items items to compare and exclude
   * @param  {(element: T)=>S} selector element field selector
   * @returns Query
   */
  exclude<S>(items: Iterable<T>, selector: (element: T) => S): Query<T>;

  /**
   * Returns a set intersection with a given sequence.
   * @param  {Iterable<T>} items
   * @returns Query
   */
  intersect(items: Iterable<T>): Query<T>;

  /**
   * Returns a set intersection with a given sequence using a field selector for comparisons.
   * @param  {Iterable<T>} items
   * @pa{(element: T)=>S} selector element field selector
   * @returns Query
   */
  intersect<S>(items: Iterable<T>, selector: (element: T) => S): Query<T>;

  /**
   * Returns a set union with a given sequence.
   * @param  {Iterable<T>} items
   * @returns Query
   */
  union(items: Iterable<T>): Query<T>;

  /**
   *Returns a set union with a given sequence using a field selector for comparisons.
   * @param  {Iterable<T>} items
   * @pa{(element: T)=>S} selector element field selector
   * @returns Query
   */
  union<S>(items: Iterable<T>, selector: (element: T) => S): Query<T>;

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
   * Returns a new sequence with all sub-sequences concatenated.
   * @param  {(element:T,index:number)=>Iterable<S>} selector
   * @returns Query
   */
  flat<S>(selector: (element: T, index: number) => Iterable<S>): Query<S>;

  /**
   * Returns a new Query that contains the key/value pair for each element and its index.
   * @returns Query
   */
  entries(): Query<[number, T]>;

  /**
   * Returns a new Query that contains the keys for each index in the sequence.
   * @returns Query
   */
  keys(): Query<number>;

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
  ): Query<TResult>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Joining functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

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
  ): Query<TResult>;

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
  ): Query<TResult>;

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
  ): Query<TResult>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Concatenation functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Concatenates the sequence with specified array.
   * @param  {Iterable<T>} items
   * @returns Query
   */
  concat(items: Iterable<T>): Query<T>;

  /**
   * Returns a new query filled from a start index to an end index with a static value.
   * The end index is not included.
   * @param value value to fill
   * @param start start index, defaults to 0
   * @param end end index, defaults to sequence count
   * @returns Query
   */
  fill(value: T, start?: number, end?: number): Query<T>;

  /**
   * Adds items at the beggining of sequence.
   * @param  {Iterable<T>} items
   * @returns Query
   * @todo review name
   */
  prepend(items: Iterable<T>): Query<T>;

  /**
   * Returns a new sequence that represents the portion from begin to end.
   * @param begin zero-based index at which to begin extraction
   * @param end zero-based index before which to end extraction (not including)
   */
  slice(begin: number, end: number): Query<T>;

  /**
   * Returns a new query that skips elements and/or adds new elements.
   * @param start index at which to start skip elements
   * @param deleteCount the number of elements to skip
   * @param items the elements to add at start index
   */
  splice(start: number, deleteCount: number, ...items: T[]): Query<T>;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// Transformation functions
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Returns an array copy of current query.
   * @returns T
   */
  toArray(): T[];

  /**
   * Returns a string representing the specified sequence and its elements.
   */
  toString(): string;

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
