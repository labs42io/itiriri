import { concat } from './iterators/concat';
import { distinct } from './iterators/distinct';
import { exclude } from './iterators/exclude';
import { fill } from './iterators/fill';
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
import { skipWhile } from './iterators/skipWhile';
import { slice } from './iterators/slice';
import { splice } from './iterators/splice';
import { take } from './iterators/take';
import { takeWhile } from './iterators/takeWhile';
import { average } from './reducers/average';
import { first } from './reducers/first';
import { indexOf } from './reducers/indexOf';
import { last } from './reducers/last';
import { lastIndexOf } from './reducers/lastIndexOf';
import { length } from './reducers/length';
import { max } from './reducers/max';
import { min } from './reducers/min';
import { nth } from './reducers/nth';
import { reduce } from './reducers/reduce';
import { sum } from './reducers/sum';
import { toArray } from './reducers/toArray';
import { toGroups } from './reducers/toGroups';
import { toMap } from './reducers/toMap';
import { toSet } from './reducers/toSet';
import { IterableQuery } from './types/IterableQuery';
import { isIterable } from './utils/isIterable';
import { iterable } from './utils/iterable';
import { iterator } from './utils/iterator';

/**
 * Creates a queryable iterable.
 * @param source can be an array or any other iterable.
 */
export default function <T>(source: Iterable<T>): IterableQuery<T> {
  return new Itiriri(source);
}

class Itiriri<T> implements IterableQuery<T>{
  constructor(private readonly source: Iterable<T>) {
  }

  [Symbol.iterator](): Iterator<T> {
    return iterator(this.source);
  }

  // #region common methods
  entries(): IterableQuery<[number, T]> {
    return new Itiriri(
      map(this.source, (elem, idx) => <[number, T]>[idx, elem]),
    );
  }

  keys(): IterableQuery<number> {
    return new Itiriri(map(this.source, (elem, idx) => idx));
  }

  values(): IterableQuery<T> {
    return new Itiriri(this.source);
  }

  forEach(action: (element: T, index: number) => void): void {
    for (const [index, value] of this.entries()) {
      action(value, index);
    }
  }

  concat(other: T | Iterable<T>): IterableQuery<T> {
    return isIterable(other) ?
      new Itiriri(concat(this.source, other)) :
      new Itiriri(concat(this.source, [other]));
  }

  prepend(other: T | Iterable<T>): IterableQuery<T> {
    return isIterable(other) ?
      new Itiriri(concat(other, this.source)) :
      new Itiriri(concat([other], this.source));
  }

  fill(value: T, start?: number, end?: number): IterableQuery<T> {
    return new Itiriri(fill(this.source, value, start, end));
  }
  // #endregion

  // #region IterableValue implementation
  nth(index: number): T {
    return nth(this.source, index);
  }

  indexOf(element: T, fromIndex: number = 0): number {
    return indexOf(this.source, (elem, idx) => idx >= fromIndex && elem === element);
  }

  findIndex(predicate: (element: T, index: number) => boolean): number {
    return indexOf(this.source, predicate);
  }

  lastIndexOf(element: T, fromIndex: number = 0): number {
    return lastIndexOf(this.source, (elem, idx) => idx >= fromIndex && elem === element);
  }

  findLastIndex(predicate: (element: T, index: number) => boolean): number {
    return lastIndexOf(this.source, predicate);
  }

  length(predicate: (element: T, index: number) => boolean = alwaysTrue()): number {
    return length(filter(this.source, predicate));
  }

  first(): T {
    return first(this.source);
  }

  find(predicate: (element: T, index: number) => boolean): T {
    return first(filter(this.source, predicate));
  }

  last(): T {
    return last(this.source);
  }

  findLast(predicate: (element: T, index: number) => boolean): T {
    return last(filter(this.source, predicate));
  }

  average(selector: (element: T, index: number) => number = element<number>()): number {
    return average(map(this.source, selector));
  }

  min(compareFn: (element1: T, element2: T) => number = comparer<T>()): T {
    return min(this.source, compareFn);
  }

  max(compareFn: (element1: T, element2: T) => number = comparer<T>()): T {
    return max(this.source, compareFn);
  }

  sum(selector: (element: T, index: number) => number = element<number>()): number {
    return sum(map(this.source, selector));
  }

  reduce<TResult>(
    callback: (accumulator: TResult | T, current: T, index: number) => any,
    initialValue?: any,
  ): any {
    return reduce(this.source, callback, initialValue);
  }

  reduceRight<TResult>(
    callback: (accumulator: TResult | T, current: T, index: number) => any,
    initialValue?: TResult,
  ): any {
    return reduce(reverse(this.source), callback, initialValue);
  }
  // #endregion

  // #region IterablePredicate implementation
  every(predicate: (element: T, index: number) => boolean): boolean {
    return indexOf(this.source, (e, i) => !predicate(e, i)) === -1;
  }

  some(predicate: (element: T, index: number) => boolean): boolean {
    return indexOf(this.source, predicate) !== -1;
  }

  includes(element: T, fromIndex: number = 0): boolean {
    return this.some((elem, idx) => idx >= fromIndex && elem === element);
  }
  // #endregion

  // #region IterablePermutation implementation
  sort(
    compareFn: (element1: T, element2: T) => number = comparer<T>(),
  ): IterableQuery<T> {
    return new Itiriri((function* (source) {
      yield* toArray(source).sort(compareFn);
    })(this.source));
  }

  shuffle(): IterableQuery<T> {
    return new Itiriri(shuffle(this.source));
  }

  reverse(): IterableQuery<T> {
    return new Itiriri(reverse(this.source));
  }
  // #endregion

  // #region IterableFilter implementation
  filter(predicate: (element: T, index: number) => boolean): IterableQuery<T> {
    return new Itiriri(filter(this.source, predicate));
  }

  take(count: number): IterableQuery<T> {
    return new Itiriri(take(this.source, count));
  }

  takeWhile(predicate: (element: T, index: number) => boolean): IterableQuery<T> {
    return new Itiriri(takeWhile(this.source, predicate));
  }

  skip(count: number): IterableQuery<T> {
    return new Itiriri(skip(this.source, count));
  }

  skipWhile(predicate: (element: T, index: number) => boolean): IterableQuery<T> {
    return new Itiriri(skipWhile(this.source, predicate));
  }

  slice(start?: number, end?: number): IterableQuery<T> {
    return new Itiriri(slice(this.source, start, end));
  }

  splice(start: number, deleteCount: number, ...items: T[]): IterableQuery<T> {
    return new Itiriri(splice(this.source, start, deleteCount, items));
  }
  // #endregion

  // #region IterableTransformation implementation
  map<S>(selector: (element: T, index: number) => S): IterableQuery<S> {
    return new Itiriri(map(this.source, selector));
  }

  flat<S>(selector: (element: T, index: number) => Iterable<S>): IterableQuery<S> {
    return new Itiriri(flat<S>(map(this.source, selector)));
  }

  groupBy<K, S>(
    keySelector: (element: T, index: number) => K,
    valueSelector: (element: T, index: number) => S = x => <any>x,
  ): IterableQuery<[K, IterableQuery<S>]> {
    const source = this.source;
    const groups = iterable(function* () {
      yield* toGroups(source, keySelector, valueSelector);
    });
    const result = map(groups, elem => <[K, IterableQuery<S>]>[elem[0], new Itiriri(elem[1])]);

    return new Itiriri(result);
  }

  // #endregion

  // #region IterableSet implementation
  distinct<S>(selector: (element: T) => S = element<S>()): IterableQuery<T> {
    return new Itiriri(distinct(this.source, selector));
  }

  exclude<S>(other: Iterable<T>, selector: (element: T) => S = element<S>()): IterableQuery<T> {
    return new Itiriri(exclude(this.source, other, selector));
  }

  intersect<S>(other: Iterable<T>, selector: (element: T) => S = element<S>()): IterableQuery<T> {
    return new Itiriri(intersect(this.source, other, selector));
  }

  union<S>(other: Iterable<T>, selector: (element: T) => S = element<S>()): IterableQuery<T> {
    return new Itiriri(distinct(concat(this.source, other), selector));
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
      this.source,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new Itiriri(iterator);
  }

  leftJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): IterableQuery<TResult> {
    const iterator = leftJoin(
      this.source,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new Itiriri(iterator);
  }

  rightJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    rightKeySelector: (element: TRight, index: number) => TKey,
    leftKeySelector: (element: T, index: number) => TKey,
    joinSelector: (right: TRight, left?: T) => TResult,
  ): IterableQuery<TResult> {
    const iterator = leftJoin(
      other,
      this.source,
      rightKeySelector,
      leftKeySelector,
      joinSelector,
    );

    return new Itiriri(iterator);
  }

  groupJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): IterableQuery<TResult> {
    const iterator = groupJoin(
      this.source,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new Itiriri(iterator);
  }
  // #endregion

  // #region IterableCast implementation
  toArray<S = T>(selector?: (element: T, index: number) => S): (T | S)[] {
    return selector ? toArray(map(this.source, selector)) :
      toArray(this.source);
  }

  toMap<K, E = T>(
    keySelector: (element: T, index: number) => K = element<K>(),
    valueSelector: (element: T, index: number) => E = element<E>(),
  ): Map<K, E | T> {
    return toMap(this.source, keySelector, valueSelector);
  }

  toGroups<K, E = T>(
    keySelector: (element: T, index: number) => K = element<K>(),
    valueSelector: (element: T, index: number) => E = element<E>(),
  ): Map<K, (E | T)[]> {
    return toGroups(this.source, keySelector, valueSelector);
  }

  toSet<S>(selector: (element: T, index: number) => S = element<S>()): Set<S> {
    return toSet(map(this.source, selector));
  }

  toString(): string {
    return toArray(this.source).toString();
  }
  // #endregion
}

function element<T>() {
  return (e: any, index?: number) => <T>e;
}

function alwaysTrue<T>() {
  return (e: any) => true;
}

function comparer<T>() {
  return (a: T, b: T) => a === b ? 0 : (a > b ? 1 : -1);
}
