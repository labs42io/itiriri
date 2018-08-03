import { expect } from 'chai';
import { iterator } from '../../lib/utils/iterator';
import { toArray } from '../../lib/reducers/toArray';
import { slice } from '../../lib/iterators/slice';

describe('iterators/slice', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const source = slice([1, 2], 0, 1);

      expect(iterator(source)).not.equals(iterator(source));
    });
  });

  describe('When called without start and end', () => {
    it('Should return the same source', () => {
      const source = [1, 2, 3, 1];
      const it = slice(source);

      expect(toArray(it)).to.be.deep.equal([1, 2, 3, 1]);
    });
  });

  describe('When start is negative', () => {
    it('Should throw error', () => {
      const source = [4, 5, 3, 1, 2];

      expect(() => toArray(slice(source, -10))).to.throw(Error);
    });
  });

  describe('When start is undefined and end is provided', () => {
    it('Should return array of 3 elements', () => {
      const source = [4, 5, 3, 2, 5, 4, 3];
      const iter = slice(source, undefined, 4);

      expect(toArray(iter)).to.be.deep.equal([4, 5, 3, 2]);
    });
  });

  describe('When end is negative', () => {
    it('Should throw exception', () => {
      const source = [];

      expect(() => toArray(slice(source, 0, -1))).to.throw(Error);
    });
  });

  describe('When called with start only', () => {
    it('Should return array of 3 elements', () => {
      const source = [1, 3, 4, 2];
      const iter = slice(source, 1);

      expect(toArray(iter)).to.be.deep.equal([3, 4, 2]);
    });
  });

  describe('When called with start and end', () => {
    it('Should return array of 2 elements', () => {
      const source = [1, 3, 4, 2, 1];
      const iter = slice(source, 1, 3);

      expect(toArray(iter)).to.be.deep.equal([3, 4]);
    });
  });
});
