import { take } from './take';
import { skip } from './skip';

export function slice<TElement>(
  source: Iterable<TElement>,
  start?: number,
  end?: number,
): Iterable<TElement> {
  if (start === undefined && end === undefined) {
    return source;
  }

  if (start !== undefined && end === undefined) {
    return skip(source, check(start, 'start'));
  }

  if (start === undefined && end !== undefined) {
    return take(source, check(end, 'end'));
  }

  // start !== undefined && end !== undefined
  return skip(take(source, check(<number>end, 'end')), check(<number>start, 'start'));
}

function check(value: number, name: string) {
  if (value < 0) {
    throw new Error(`Invalid ${name} range, use positive index.`);
  }

  return value;
}
