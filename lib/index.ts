import { concat } from './iterators/concat';
import { distinct } from './iterators/distinct';
import { except } from './iterators/except';
import { filter } from './iterators/filter';
import { flatten } from './iterators/flatten';
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
import { toMap } from './reducers/toMap';
import { toGroups } from './reducers/toGroups';
import { toSet } from './reducers/toSet';
import { iterator } from './utils/ierator';

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

  indexOf(predicateOrElement: T | ((element: T) => boolean)): number {
    return indexOf(this, toPredicate(predicateOrElement));
  }

  lastIndexOf(predicateOrElement: T | ((element: T) => boolean)): number {
    return lastIndexOf(this, toPredicate(predicateOrElement));
  }

  count(predicate: (element: T, index: number) => boolean = x => true): number {
    return count(filter(this, predicate));
  }

  first(predicate: (element: T, index: number) => boolean = x => true): T {
    return first(filter(this, predicate));
  }

  last(predicate: (element: T, index: number) => boolean = x => true): T {
    return last(filter(this, predicate));
  }

  average(selector: (element: T, index: number) => number = x => <any>x): number {
    return average(map(this, selector));
  }

  min(selector: (element: T, index: number) => number = x => <any>x): number {
    return min(map(this, selector));
  }

  max(selector: (element: T, index: number) => number = x => <any>x): number {
    return max(map(this, selector));
  }

  sum(selector: (element: T, index: number) => number = x => <any>x): number {
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

  contains(element: T): boolean {
    return this.some(x => x === element);
  }

  shuffle(): Query<T> {
    return new IterableQuery(shuffle(this));
  }

  reverse(): Query<T> {
    return new IterableQuery(reverse(this));
  }

  sort<S>(selector: (element: T) => S = x => <any>x): Query<T> {
    return new IterableQuery(sort(this, selector));
  }

  sortDesc<S>(selector: (element: T) => S = x => <any>x): Query<T> {
    return new IterableQuery(sort(this, selector, true));
  }

  distinct<S>(selector: (element: T) => S = x => <any>x): Query<T> {
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

  except<S>(queryOrArray: Query<T> | T[], selector: (element: T) => S = e => <any>e): Query<T> {
    return new IterableQuery(except(this, toQuery(queryOrArray), selector));
  }

  intersect<S>(
    queryOrArray: Query<T> | T[],
    selector: (element: T) => S = e => <S><any>e,
  ): Query<T> {
    return new IterableQuery(intersect(this, toQuery(queryOrArray), selector));
  }

  union<S>(queryOrArray: Query<T> | T[], selector?: (element: T) => S): Query<T> {
    return new IterableQuery(distinct(concat(this, toQuery(queryOrArray)), selector));
  }

  map<S>(selector: (element: T, index: number) => S): Query<S> {
    return new IterableQuery(map(this, selector));
  }

  mapAll<S>(selector: (element: T, index: number) => Query<S> | S[]): Query<S> {
    const iterator = this
      .map((e, i) => toQuery(selector(e, i)));

    return new IterableQuery(flatten<S>(iterator));
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
    queryOrItems: Query<TRight> | TRight[],
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): Query<TResult> {
    const iterator = groupJoin(
      this,
      toQuery(queryOrItems),
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new IterableQuery(iterator);
  }

  join<TKey, TRight, TResult>(
    queryOrItems: Query<TRight> | TRight[],
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): Query<TResult> {
    const iterator = join(
      this,
      toQuery(queryOrItems),
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new IterableQuery(iterator);
  }

  leftJoin<TKey, TRight, TResult>(
    queryOrItems: Query<TRight> | TRight[],
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): Query<TResult> {
    const iterator = leftJoin(
      this,
      toQuery(queryOrItems),
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new IterableQuery(iterator);
  }

  concat(query: Query<T> | T[]): Query<T> {
    return new IterableQuery(concat(this, toQuery(query)));
  }

  prepend(query: Query<T> | T[]): Query<T> {
    return new IterableQuery(concat(toQuery(query), this));
  }

  toArray<S = T>(selector?: (element: T, index: number) => S): (T | S)[] {
    return toArray(this);
  }

  toMap<K, E = T>(
    keySelector: (element: T, index: number) => K,
    valueSelector: (element: T, index: number) => E = x => <any>x,
  ): Map<K, E | T> {
    return toMap(this, keySelector, valueSelector);
  }

  toMapAll<K, E = T>(
    keySelector: (element: T, index: number) => K,
    valueSelector?: (element: T, index: number) => E,
  ): Map<K, (E | T)[]> {
    return toGroups(this, keySelector, valueSelector);
  }

  toSet<S>(selector?: (element: T, index: number) => S): Set<S> {
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

function toQuery<T>(query: Query<T> | T[]): Query<T> {
  return Array.isArray(query) ? new IterableQuery(query) : query;
}
