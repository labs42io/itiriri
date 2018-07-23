import { expect } from 'chai';
import { flatten } from '../../lib/iterators/flatten';
import { fromArray } from '../../lib/iterators/fromArray';
import { getIterator } from '../../lib/iterators/getIterator';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/flatten', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const left = fromArray([1, 2, 3]);
      const right = fromArray([4, 5]);
      const source = fromArray([left, right]);

      expect(flatten(source)).not.equals(flatten(source));
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', () => {
      const source = fromArray([]);
      const iterator = getIterator(flatten(source));

      expect(iterator.next())
        .to.have.property('done')
        .that.is.true;
    });
  });

  describe('When left source is empty', () => {
    it('Should return elements from right source', () => {
      const left = fromArray([]);
      const right = fromArray([4, 5]);
      const source = fromArray([left, right]);
      const iterator = flatten(source);
      const result = toArray(iterator);

      expect(result).to.deep.equal([4, 5]);
    });
  });

  describe('When right source is empty', () => {
    it('Should return elements from left source', () => {
      const left = fromArray([1, 2, 3]);
      const right = fromArray([]);
      const source = fromArray([left, right]);
      const iterator = flatten(source);
      const result = toArray(iterator);

      expect(result).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When has multiple iterables with elements', () => {
    it('Should return elements from left source', () => {
      const source1 = fromArray([1, 2, 3]);
      const source2 = fromArray([4, 5, 1]);
      const source3 = fromArray([42]);

      const source = fromArray([source1, source2, source3]);
      const iterator = flatten(source);
      const result = toArray(iterator);

      expect(result).to.deep.equal([1, 2, 3, 4, 5, 1, 42]);
    });
  });
});
