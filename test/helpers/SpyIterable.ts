export class SpyIterable<T> implements Iterable<T> {
  private iterated: boolean = false;
  constructor(private readonly source: Iterable<T>) { }

  get wasIterated() {
    return this.iterated;
  }

  [Symbol.iterator](): Iterator<T> {
    this.iterated = true;
    return this.source[Symbol.iterator]();
  }
}
