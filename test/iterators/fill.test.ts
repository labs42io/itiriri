import { expect } from 'chai';
import { iterator } from '../../lib/utils/iterator';
import { fill } from '../../lib/iterators/fill';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/fill', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const left = [1, 2];
      const right = [3, 4, 5];
      const source = fill(left, right);

      expect(iterator(source)).not.equals(iterator(source));
    });
  });

  describe('When start is greater than end', () => {
    it('Should return the same source', () => {
      const source = [4, 5, 3, 1, 2];
      const iter = fill(source, 10, 10, 9);

      expect(toArray(iter)).to.be.deep.equal([4, 5, 3, 1, 2]);
    });
  });

  describe('When called with negative start', () => {
    it('Should throw exception', () => {
      const source = [];

      expect(() => fill(source, 0, -1)).to.throw(Error);
    });
  });

  describe('When called with negative end', () => {
    it('Should throw exception', () => {
      const source = [];

      expect(() => fill(source, 0, 1, -1)).to.throw(Error);
    });
  });

  describe('When called without start and end', () => {
    it('Should fill the whole array', () => {
      const source = [1, 3, 4, 2];
      const iter = fill(source, 0);

      expect(toArray(iter)).to.be.deep.equal([0, 0, 0, 0]);
    });
  });

  describe('When called with start only', () => {
    it('Should return array of 4 elements', () => {
      const source = [1, 3, 4, 2];
      const iter = fill(source, 0, 1);

      expect(toArray(iter)).to.be.deep.equal([1, 0, 0, 0]);
    });
  });

  describe('When called with start and end', () => {
    it('Should return array of 5 elements', () => {
      const source = [1, 3, 4, 2, 1];
      const iter = fill(source, 0, 1, 3);

      expect(toArray(iter)).to.be.deep.equal([1, 0, 0, 2, 1]);
    });
  });
});
