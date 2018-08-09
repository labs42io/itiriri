export class SpyIterable<T> implements Iterable<T> {
  private iterations: number = 0;
  constructor(private readonly source: Iterable<T>) { }

  get iterated() {
    return this.iterations > 0;
  }

  get iteratedOnce() {
    return this.iterations === 1;
  }

  [Symbol.iterator](): Iterator<T> {
    this.iterations++;
    return this.source[Symbol.iterator]();
  }
}
