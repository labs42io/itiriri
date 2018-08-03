export function* numbers(offset = 0, step = 1) {
  let i = offset;
  while (1) {
    yield i;
    i += step;
  }
}
