import { expect } from 'chai';
import { iterator } from '../../lib/utils/iterator';
import { toArray } from '../../lib/reducers/toArray';
import { splice } from '../../lib/iterators/splice';

describe('iterators/splice', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const source = splice([1, 2], 0, 1, [3, 3, 3]);

      expect(iterator(source)).not.equals(iterator(source));
    });
  });

  describe('When start is negative', () => {
    it('Should throw error', () => {
      const source = [4, 5, 3, 1, 2];

      expect(() => toArray(splice(source, -10, 0, []))).to.throw(Error);
    });
  });

  describe('When delete count is negative', () => {
    it('Should throw exception', () => {
      const source = [];

      expect(() => toArray(splice(source, 0, -1, []))).to.throw(Error);
    });
  });

  describe('When called with zero delete count', () => {
    it('Should return array of 3 elements', () => {
      const source = [2];
      const iter = splice(source, 0, 0, [4, 4]);

      expect(toArray(iter)).to.be.deep.equal([4, 4, 2]);
    });

    it('Should return array of 5 elements', () => {
      const source = [2, 3];
      const iter = splice(source, 1, 0, [4, 4]);

      expect(toArray(iter)).to.be.deep.equal([2, 4, 4, 3]);
    });
  });

  describe('When called with non-zero delete count', () => {
    it('Should return array of 2 elements', () => {
      const source = [1, 3, 4];
      const iter = splice(source, 2, 1, [-1, -1, -1]);

      expect(toArray(iter)).to.be.deep.equal([1, 3, -1, -1, -1]);
    });

    it('Should return array of 4 elements', () => {
      const source = [4, 5, 6, 3];
      const iter = splice(source, 2, 10, [1, 2]);

      expect(toArray(iter)).to.be.deep.equal([4, 5, 1, 2]);
    });
  });
});
