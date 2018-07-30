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
import { Query, QueryGroup } from './Query';
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
import { iterator } from './utils/iterator';

export { Query, QueryGroup };

export function query<T>(items: Iterable<T>): Query<T> {
  return new IterableQuery(items);
}

class IterableQuery<T> implements Query<T> {
  constructor(private readonly source: Iterable<T>) {
  }

  [Symbol.iterator](): Iterator<T> {
    return iterator(this.source);
  }

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
    const elements = toArray(this);
    return elements.reduceRight(callback, initialValue);
  }

  every(predicate: (element: T, index: number) => boolean): boolean {
    return indexOf(this, (e, i) => !predicate(e, i)) === -1;
  }

  some(predicate: (element: T, index: number) => boolean): boolean {
    return indexOf(this, predicate) !== -1;
  }

  includes(element: T): boolean {
    return this.some(x => x === element);
  }

  shuffle(): Query<T> {
    return new IterableQuery(shuffle(this));
  }

  reverse(): Query<T> {
    return new IterableQuery(reverse(this));
  }

  sort<S>(selector: (element: T, index: number) => S = element<S>()): Query<T> {
    return new IterableQuery(sort(this, selector));
  }

  sortDesc<S>(selector: (element: T, index: number) => S = element<S>()): Query<T> {
    return new IterableQuery(sort(this, selector, true));
  }

  distinct<S>(selector: (element: T) => S = element<S>()): Query<T> {
    return new IterableQuery(distinct(this, selector));
  }

  filter(predicate: (element: T, index: number) => boolean): Query<T> {
    return new IterableQuery(filter(this, predicate));
  }

  take(count: number): Query<T> {
    return new IterableQuery(take(this, count));
  }

  skip(count: number): Query<T> {
    return new IterableQuery(skip(this, count));
  }

  exclude<S>(items: Iterable<T>, selector: (element: T) => S = element<S>()): Query<T> {
    return new IterableQuery(exclude(this, items, selector));
  }

  intersect<S>(items: Iterable<T>, selector: (element: T) => S = element<S>()): Query<T> {
    return new IterableQuery(intersect(this, items, selector));
  }

  union<S>(items: Iterable<T>, selector: (element: T) => S = element<S>()): Query<T> {
    return new IterableQuery(distinct(concat(this, items), selector));
  }

  map<S>(selector: (element: T, index: number) => S): Query<S> {
    return new IterableQuery(map(this, selector));
  }

  flat<S>(selector: (element: T, index: number) => Iterable<S>): Query<S> {
    return new IterableQuery(flat<S>(this.map(selector)));
  }

  forEach(action: (element: T, index: number) => void): Query<T> {
    const iterator = map(this, (elem, idx) => {
      action(elem, idx);
      return elem;
    });

    return new IterableQuery(iterator);
  }

  groupBy<K, S>(
    keySelector: (element: T, index: number) => K,
    valueSelector: (element: T, index: number) => S = x => <any>x,
  ): Query<QueryGroup<K, T | S>> {
    const result = map(
      toGroups(this, keySelector, valueSelector),
      elem => <QueryGroup<K, T | S>>new EnumerableGroup(elem[0], elem[1]));

    return new IterableQuery(result);
  }

  groupJoin<TKey, TRight, TResult>(
    items: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): Query<TResult> {
    const iterator = groupJoin(
      this,
      items,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new IterableQuery(iterator);
  }

  join<TKey, TRight, TResult>(
    items: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): Query<TResult> {
    const iterator = join(
      this,
      items,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new IterableQuery(iterator);
  }

  leftJoin<TKey, TRight, TResult>(
    items: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): Query<TResult> {
    const iterator = leftJoin(
      this,
      items,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new IterableQuery(iterator);
  }

  rightJoin<TKey, TRight, TResult>(
    items: Iterable<TRight>,
    rightKeySelector: (element: TRight, index: number) => TKey,
    leftKeySelector: (element: T, index: number) => TKey,
    joinSelector: (right: TRight, left?: T) => TResult,
  ): Query<TResult> {
    throw new Error('not implemented');
    // const iterator = leftJoin(
    //   this,
    //   items,
    //   leftKeySelector,
    //   rightKeySelector,
    //   joinSelector);

    // return new IterableQuery(iterator);
  }

  concat(items: Iterable<T>): Query<T> {
    return new IterableQuery(concat(this, items));
  }

  entries(): Query<[number, T]> {
    return new IterableQuery(
      map(this, (elem, idx) => <[number, T]>[idx, elem]),
    );
  }

  keys(): Query<number> {
    throw new Error('Not implemented.');
  }

  fill(value: T, start?: number, end?: number): Query<T> {
    throw new Error('not implemented');
  }

  prepend(items: Iterable<T>): Query<T> {
    return new IterableQuery(concat(items, this));
  }

  slice(begin: number, end: number): Query<T> {
    throw new Error('Not implemented.');
  }

  splice(start: number, deleteCount: number, ...items: T[]): Query<T> {
    throw new Error('Not implemented');
  }

  toArray<S = T>(selector: (element: T, index: number) => S = element<S>()): (T | S)[] {
    return toArray(map(this, selector));
  }

  toString(): string {
    throw new Error('Not implemented.');
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
}

class EnumerableGroup<K, E> extends IterableQuery<E> implements QueryGroup<K, E> {
  readonly key: K;

  constructor(key: K, source: Iterable<E>) {
    super(source);
    this.key = key;
  }
}

function toPredicate<T>(predicateOrElement: T | ((element: T, index: number) => boolean)) {
  return typeof predicateOrElement === 'function' ?
    predicateOrElement : (x => x === predicateOrElement);
}

function element<T>() {
  return (e: any, index?: number) => <T>e;
}

function alwaysTrue<T>() {
  return (e: any) => true;
}
