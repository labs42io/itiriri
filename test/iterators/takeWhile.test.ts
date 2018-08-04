import { expect } from 'chai';
import { toArray } from '../../lib/reducers/toArray';
import { takeWhile } from '../../lib/iterators/takeWhile';

describe('iterators/takeWhile', () => {
  describe(`When don't have searched elements`, () => {
    it('Should return empty source', () => {
      const source = [1, 2];
      const iterator = takeWhile(source, () => false);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When take some elements', () => {
    it('Should return first even elements', () => {
      const source = [0, 2, 4, 5, 6, 7, 8];
      const iterator = takeWhile(source, e => e % 2 === 0);

      expect(toArray(iterator)).to.deep.equal([0, 2, 4]);
    });
    it('Should return first positive elemts', () => {
      const source = [1, 2, 3, -2, 4, 5];
      const iterator = takeWhile(source, e => e > 0);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When predicate is false for first element', () => {
    it('Should return empty source', () => {
      const source = [1, 2, 4, 6, 8];
      const iterator = takeWhile(source, e => e % 2 === 0);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When take all elements', () => {
    it('Should return all elements', () => {
      const source = [1, 2, 3, 4, 5, 6];
      const iterator = takeWhile(source, () => true);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('When take elements from empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const iterator = takeWhile(source, () => true);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });
});
