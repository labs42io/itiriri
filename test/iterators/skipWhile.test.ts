import { expect } from 'chai';
import { toArray } from '../../lib/reducers/toArray';
import { skipWhile } from '../../lib/iterators/skipWhile';

describe('iterators/skipWhile', () => {
  describe('When don\'t have searched elements', () => {
    it('Should return all elements', () => {
      const source = [1, 2];
      const iterator = skipWhile(source, () => false);

      expect(toArray(iterator)).to.deep.equal([1, 2]);
    });
  });

  describe('When skip some elements', () => {
    it('Should skip first even elements', () => {
      const source = [0, 2, 4, 5, 6, 7, 8];
      const iterator = skipWhile(source, e => e % 2 === 0);

      expect(toArray(iterator)).to.deep.equal([5, 6, 7, 8]);
    });
    it('Should skip first positive elemts', () => {
      const source = [1, 2, 3, -2, 4, 5];
      const iterator = skipWhile(source, e => e > 0);

      expect(toArray(iterator)).to.deep.equal([-2, 4, 5]);
    });
  });

  describe('When predicate is false for first element', () => {
    it('Should return all elements', () => {
      const source = [1, 2, 4, 6, 8];
      const iterator = skipWhile(source, e => e % 2 === 0);

      expect(toArray(iterator)).to.deep.equal([1, 2, 4, 6, 8]);
    });
  });

  describe('When skip all elements', () => {
    it('Should return empty source', () => {
      const source = [1, 2, 3, 4, 5, 6];
      const iterator = skipWhile(source, () => true);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When skip elements from empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const iterator = skipWhile(source, () => true);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When take elements by index', () => {
    it('Should return 3 elements', () => {
      const source = [1, 2, 3, 4, 5, 5, 5];
      const iterator = skipWhile(source, (_, idx) => idx <= 3);

      expect(toArray(iterator)).to.deep.equal([5, 5, 5]);
    });
  });

  describe('When take elements by object property', () => {
    it('Should return 2 elements', () => {
      const source = [
        { val: 1 },
        { val: 10 },
        { val: -1 },
        { val: -2 },
      ];
      const iterator = skipWhile(source, e => e.val > 0);

      expect(toArray(iterator)).to.deep.equal([
        { val: -1 },
        { val: -2 },
      ]);
    });
  });
});
