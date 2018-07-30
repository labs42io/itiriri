import { expect } from 'chai';
import { filter } from '../../lib/iterators/filter';
import { toArray } from '../../lib/reducers/toArray';
import { iterator } from '../../lib/utils/iterator';

describe('iterators/filter', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const source = [1, 2, 3];
      const result = filter(source, x => true);

      expect(iterator(result)).not.equals(iterator(result));
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', () => {
      const source = [];
      const iterator = filter(source, x => true);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When predicate is always true', () => {
    it('Should return all elements', () => {
      const source = [1, 2, 3];
      const iterator = filter(source, x => true);
      const result = toArray(iterator);

      expect(result).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When predicate is always false', () => {
    it('Should return completed iterator', () => {
      const source = [1, 2, 3];
      const iterator = filter(source, x => false);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When predicate matches odd indexes', () => {
    it('Should return elements', () => {
      const source = [1, 42, 3, 4242];
      const iterator = filter(source, (x, i) => i % 2 === 1);
      const result = toArray(iterator);

      expect(result).to.deep.equal([42, 4242]);
    });
  });
});
