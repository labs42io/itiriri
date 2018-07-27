import { expect } from 'chai';
import { query } from '../../lib';
import { count } from '../../lib/reducers/count';

describe('reducers/count', () => {
  describe('When called on empty source', () => {
    it('Should return 0', () => {
      const arr = [];

      expect(count(arr)).to.equal(0);
    });
  });

  describe('When called on a non-empty source', () => {
    it('Should return count for 4 elements', () => {
      const arr = [0, 1, 2, 1];

      expect(count(arr)).to.equal(4);
    });
    it('Should return count for 1 element', () => {
      const arr = [0];

      expect(count(arr)).to.equal(1);
    });
    it('Should return count for 6 elements', () => {
      const arr = [0, 1, 1, 1, 0, 0];

      expect(count(arr)).to.equal(6);
    });
  });
});
