import { expect } from 'chai';
import { lastIndexOf } from '../../lib/reducers/lastIndexOf';

describe('reducers/lastIndexOf', () => {
  describe('When called on empty array', () => {
    it('Should return -1', () => {
      const source = [];

      expect(lastIndexOf(source, () => true)).to.be.equal(-1);
    });
  });

  describe('When called on some array', () => {
    it('Should return the index 3', () => {
      const source = [4, 5, 1, 20, 3];

      expect(lastIndexOf(source, elem => elem === 20)).to.be.equal(3);
    });

    it('Should return the index 2', () => {
      const source = [1, 2, 1, 3, 4];

      expect(lastIndexOf(source, elem => elem === 1)).to.be.equal(2);
    });

    it('Should return -1 if elements does not exist', () => {
      const source = ['a', 'b', 'z', 'aa', 'abc'];
      expect(lastIndexOf(source, elem => elem === 'c')).to.be.equal(-1);
    });
  });

  describe('When called with index depending predicate', () => {
    it('Should return first index', () => {
      const source = [1, 4, 3, 2];

      expect(lastIndexOf(source, (_, idx) => idx === 0)).to.be.equal(0);
    });

    it('Should return last index', () => {
      const source = [1, 4, 3, 2, 5];

      expect(lastIndexOf(source, (_, idx) => { return idx * 2 === 4; })).to.be.equal(2);
    });

    it('Should return last index for multiple matches', () => {
      const source = [1, 4, 3, 2, 5];

      expect(lastIndexOf(source, (_, idx) => { return idx % 2 === 0; })).to.be.equal(4);
    });

    it('Should return the middle index', () => {
      const source = [1, 40, 3, 200, 1001];

      expect(lastIndexOf(source, (_, idx) => idx === 2)).to.be.equal(2);
    });
  });
});
