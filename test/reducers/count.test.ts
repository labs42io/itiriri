import { expect } from 'chai';
import { query } from '../../lib/';

describe('reducers/count', () => {
  describe('When called on empty source', () => {
    it('Should return 0', () => {
      const arr = [];
      const q = query(arr);

      expect(q.count()).to.deep.equal(0);
    });
  });

  describe('When called on arbitrary source', () => {
    it('Should return it\'s length', () => {
      const arr = [0, 1, 2, 1];
      const q = query(arr);

      expect(q.count()).to.deep.equal(4);
    });
    it('Should return it\'s length', () => {
      const arr = [0];
      const q = query(arr);

      expect(q.count()).to.deep.equal(1);
    });
    it('Should return it\'s length', () => {
      const arr = [0, 1, 1, 1, 0, 0];
      const q = query(arr);

      expect(q.count()).to.deep.equal(6);
    });
  });
});
