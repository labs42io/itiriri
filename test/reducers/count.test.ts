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

  describe('When called on arbitrary source', () => {
    it('Should return it\'s length', () => {
      const arr = [0, 1, 2, 1];

      expect(count(arr)).to.equal(4);
    });
    it('Should return it\'s length', () => {
      const arr = [0];

      expect(count(arr)).to.equal(1);
    });
    it('Should return it\'s length', () => {
      const arr = [0, 1, 1, 1, 0, 0];

      expect(count(arr)).to.equal(6);
    });
  });
});
