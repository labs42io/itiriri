import { expect } from 'chai';
import { flat } from '../../lib/iterators/flat';
import { iterator } from '../../lib/utils/iterator';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/flat', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const left = [1, 2, 3];
      const right = [4, 5];
      const source = [left, right];

      expect(flat(source)).not.equals(flat(source));
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', () => {
      const source = [];
      const it = iterator(flat(source));

      expect(it.next())
        .to.have.property('done')
        .that.is.true;
    });
  });

  describe('When left source is empty', () => {
    it('Should return elements from right source', () => {
      const left = [];
      const right = [4, 5];
      const source = [left, right];
      const iterator = flat(source);
      const result = toArray(iterator);

      expect(result).to.deep.equal([4, 5]);
    });
  });

  describe('When right source is empty', () => {
    it('Should return elements from left source', () => {
      const left = [1, 2, 3];
      const right = [];
      const source = [left, right];
      const iterator = flat(source);
      const result = toArray(iterator);

      expect(result).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When has multiple iterables with elements', () => {
    it('Should return elements from left source', () => {
      const source1 = [1, 2, 3];
      const source2 = [4, 5, 1];
      const source3 = [42];

      const source = [source1, source2, source3];
      const iterator = flat(source);
      const result = toArray(iterator);

      expect(result).to.deep.equal([1, 2, 3, 4, 5, 1, 42]);
    });
  });
});
