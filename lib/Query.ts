import { concat } from './iterators/concat';
import { distinct } from './iterators/distinct';
import { exclude } from './iterators/exclude';
import { filter } from './iterators/filter';
import { flat } from './iterators/flat';
import { groupJoin } from './iterators/groupJoin';
import { intersect } from './iterators/intersect';
import { join } from './iterators/join';
import { leftJoin } from './iterators/leftJoin';
import { map } from './iterators/map';
import { reverse } from './iterators/reverse';
import { shuffle } from './iterators/shuffle';
import { skip } from './iterators/skip';
import { sort } from './iterators/sort';
import { take } from './iterators/take';
import { at } from './reducers/at';
import { average } from './reducers/average';
import { count } from './reducers/count';
import { first } from './reducers/first';
import { indexOf } from './reducers/indexOf';
import { last } from './reducers/last';
import { lastIndexOf } from './reducers/lastIndexOf';
import { max } from './reducers/max';
import { min } from './reducers/min';
import { reduce } from './reducers/reduce';
import { sum } from './reducers/sum';
import { toArray } from './reducers/toArray';
import { toGroups } from './reducers/toGroups';
import { toMap } from './reducers/toMap';
import { toSet } from './reducers/toSet';
import { IterableQuery } from './types/IterableQuery';
import { IterableQueryGroup } from './types/IterableTransformation';
import { iterator } from './utils/iterator';
import { iterable } from './utils/iterable';

export function query<T>(source: Iterable<T>): IterableQuery<T> {
  return new Query(source);
}

class Query<T> implements IterableQuery<T>{
  constructor(private readonly source: Iterable<T>) {
  }

  [Symbol.iterator](): Iterator<T> {
    return iterator(this.source);
  }

  // #region common methods
  entries(): IterableQuery<[number, T]> {
    return new Query(
      map(this, (elem, idx) => <[number, T]>[idx, elem]),
    );
  }

  keys(): IterableQuery<number> {
    return new Query(map(this, (elem, idx) => idx));
  }

  values(): IterableQuery<T> {
    return new Query(this);
  }

  forEach(action: (element: T, index: number) => void): IterableQuery<T> {
    const iterator = map(this, (elem, idx) => {
      action(elem, idx);
      return elem;
    });

    return new Query(iterator);
  }

  concat(other: Iterable<T>): IterableQuery<T> {
    return new Query(concat(this, other));
  }

  prepend(other: Iterable<T>): IterableQuery<T> {
    return new Query(concat(other, this));
  }

  fill(value: T, start?: number, end?: number): IterableQuery<T> {
    throw new Error('Method not implemented.');
  }
  // #endregion

  // #region IterableValue implementation
  at(index: number): T {
    return at(this, index);
  }

  indexOf(element: T): number {
    return indexOf(this, elem => elem === element);
  }

  findIndex(predicate: (element: T) => boolean): number {
    return indexOf(this, predicate);
  }

  lastIndexOf(element: T): number {
    return lastIndexOf(this, elem => elem === element);
  }

  findLastIndex(predicate: (element: T) => boolean): number {
    return lastIndexOf(this, predicate);
  }

  count(predicate: (element: T, index: number) => boolean = alwaysTrue()): number {
    return count(filter(this, predicate));
  }

  first(): T {
    return first(this);
  }

  find(predicate: (element: T, index: number) => boolean): T {
    return first(filter(this, predicate));
  }

  last(): T {
    return last(this);
  }

  findLast(predicate: (element: T, index: number) => boolean): T {
    return last(filter(this, predicate));
  }

  average(selector: (element: T, index: number) => number = element<number>()): number {
    return average(map(this, selector));
  }

  min(selector: (element: T, index: number) => number = element<number>()): number {
    return min(map(this, selector));
  }

  max(selector: (element: T, index: number) => number = element<number>()): number {
    return max(map(this, selector));
  }

  sum(selector: (element: T, index: number) => number = element<number>()): number {
    return sum(map(this, selector));
  }

  reduce<TResult>(
    callback: (accumulator: TResult | T, current: T, index: number) => any,
    initialValue?: any,
  ): any {
    return reduce(this, callback, initialValue);
  }

  reduceRight<TResult>(
    callback: (accumulator: TResult | T, current: T, index: number) => any,
    initialValue?: TResult,
  ): any {
    return reduce(reverse(this), callback, initialValue);
  }
  // #endregion

  // #region IterablePredicate implementation
  every(predicate: (element: T, index: number) => boolean): boolean {
    return indexOf(this, (e, i) => !predicate(e, i)) === -1;
  }

  some(predicate: (element: T, index: number) => boolean): boolean {
    return indexOf(this, predicate) !== -1;
  }

  includes(element: T): boolean {
    return this.some(x => x === element);
  }
  // #endregion

  // #region IterablePermutation implementation
  sort<S>(selector: (element: T, index: number) => S = element<S>()): IterableQuery<T> {
    return new Query(sort(this, selector));
  }

  sortDesc<S>(selector: (element: T, index: number) => S = element<S>()): IterableQuery<T> {
    return new Query(sort(this, selector, true));
  }

  shuffle(): IterableQuery<T> {
    return new Query(shuffle(this));
  }

  reverse(): IterableQuery<T> {
    return new Query(reverse(this));
  }
  // #endregion

  // #region IterableFilter implementation
  filter(predicate: (element: T, index: number) => boolean): IterableQuery<T> {
    return new Query(filter(this, predicate));
  }

  take(count: number): IterableQuery<T> {
    return new Query(take(this, count));
  }

  skip(count: number): IterableQuery<T> {
    return new Query(skip(this, count));
  }

  slice(begin: number, end: number): IterableQuery<T> {
    throw new Error('Method not implemented.');
  }

  splice(start: number, deleteCount: number, ...items: T[]): IterableQuery<T> {
    throw new Error('Method not implemented.');
  }
  // #endregion

  // #region IterableTransformation implementation
  map<S>(selector: (element: T, index: number) => S): IterableQuery<S> {
    return new Query(map(this, selector));
  }

  flat<S>(selector: (element: T, index: number) => Iterable<S>): IterableQuery<S> {
    return new Query(flat<S>(this.map(selector)));
  }

  groupBy<K, S>(
    keySelector: (element: T, index: number) => K,
    valueSelector: (element: T, index: number) => S = x => <any>x,
  ): IterableQuery<IterableQueryGroup<K, T | S>> {
    const groups = iterable(() => toGroups(this, keySelector, valueSelector));
    const result = map(groups, elem => new Group(elem[0], elem[1]));

    return new Query(result);
  }

  // #endregion

  // #region IterableSet implementation
  distinct<S>(selector: (element: T) => S = element<S>()): IterableQuery<T> {
    return new Query(distinct(this, selector));
  }

  exclude<S>(other: Iterable<T>, selector: (element: T) => S = element<S>()): IterableQuery<T> {
    return new Query(exclude(this, other, selector));
  }

  intersect<S>(other: Iterable<T>, selector: (element: T) => S = element<S>()): IterableQuery<T> {
    return new Query(intersect(this, other, selector));
  }

  union<S>(other: Iterable<T>, selector: (element: T) => S = element<S>()): IterableQuery<T> {
    return new Query(distinct(concat(this, other), selector));
  }
  // #endregion

  // #region IterableJoin implementation
  join<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): IterableQuery<TResult> {
    const iterator = join(
      this,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new Query(iterator);
  }

  leftJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): IterableQuery<TResult> {
    const iterator = leftJoin(
      this,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new Query(iterator);
  }

  rightJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    rightKeySelector: (element: TRight, index: number) => TKey,
    leftKeySelector: (element: T, index: number) => TKey,
    joinSelector: (right: TRight, left?: T) => TResult,
  ): IterableQuery<TResult> {
    throw new Error('Method not implemented.');
  }

  groupJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): IterableQuery<TResult> {
    const iterator = groupJoin(
      this,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new Query(iterator);
  }
  // #endregion

  // #region IterableCast implementation
  toArray<S = T>(selector: (element: T, index: number) => S = element<S>()): (T | S)[] {
    return toArray(map(this, selector));
  }

  toMap<K, E = T>(
    keySelector: (element: T, index: number) => K = element<K>(),
    valueSelector: (element: T, index: number) => E = element<E>(),
  ): Map<K, E | T> {
    return toMap(this, keySelector, valueSelector);
  }

  toGroups<K, E = T>(
    keySelector: (element: T, index: number) => K = element<K>(),
    valueSelector: (element: T, index: number) => E = element<E>(),
  ): Map<K, (E | T)[]> {
    return toGroups(this, keySelector, valueSelector);
  }

  toSet<S>(selector: (element: T, index: number) => S = element<S>()): Set<S> {
    return toSet(map(this, selector));
  }

  toString(): string {
    throw new Error('Method not implemented.');
  }
  // #endregion
}

class Group<K, E> extends Query<E> implements IterableQueryGroup<K, E> {
  readonly key: K;

  constructor(key: K, source: Iterable<E>) {
    super(source);
    this.key = key;
  }
}

function element<T>() {
  return (e: any, index?: number) => <T>e;
}

function alwaysTrue<T>() {
  return (e: any) => true;
}
