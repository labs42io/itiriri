import { getIterator } from './getIterator';
import { fromGenerator } from './fromGenerator';
import { take } from './take';

export function copyWithin<T>(
  source: Iterable<T>, target: number, start: number, end?: number,
): Iterable<T> {
  return fromGenerator(() => generator(source, target, start, end));
}

function* generator<T>(source: Iterable<T>, target: number, start: number, end?: number) {
  const iterator = getIterator(source);
  const buffer: T[] = [];

  let index = 0;
  let current = iterator.next();

  // yield [0, target)
  while (!current.done && index < target) {
    if (index >= start && index < end) {
      buffer.push(current.value);
    }

    yield current.value;

    current = iterator.next();
    index += 1;
  }

  // cache [target, start)
  while (!current.done && index < start) {
    if (index >= target + end - start) {
      buffer.push(current.value);
    }

    current = iterator.next();
    index += 1;
  }

  // yield [target, target + end - start)
  let n = start;
  while (!current.done && n < end) {
    buffer.push(current.value);
    if (start > target) {
      yield current.value;
    } else {
      yield buffer.shift();
    }

    current = iterator.next();
    index += 1;
    n += 1;
  }

  // yield cache [target + end - start, cache.length)
  for (let i = 0; i < buffer.length && target < start; i++) {
    yield buffer[i];
  }

  // yield rest
  while (!current.done) {
    yield current.value;
    current = iterator.next();
  }
}

