import { expect } from 'chai';
import { indexOf } from '../../lib/reducers/indexOf';

describe('reducers/indexOf', () => {
  describe('When called on empty array', () => {
    it('Should return -1', () => {
      const source = [];

      expect(indexOf(source, () => true)).to.be.equal(-1);
    });
  });

  describe('When called on some array', () => {
    it('Should return the index 3', () => {
      const source = [4, 5, 1, 20, 3];

      expect(indexOf(source, elem => elem === 20)).to.be.equal(3);
    });

    it('Should return the index 0', () => {
      const source = [1, 2, 1, 3, 4];

      expect(indexOf(source, elem => elem === 1)).to.be.equal(0);
    });

    it('Should return -1 if elements does not exist', () => {
      const source = ['a', 'b', 'z', 'aa', 'abc'];

      expect(indexOf(source, elem => elem === 'c')).to.be.equal(-1);
    });

    it('Should return the index of last element', () => {
      const source = [5, 7, 1, 3];

      expect(indexOf(source, elem => elem === 3)).to.be.equal(3);
    });
  });

  describe('When called with index depending predicate', () => {
    it('Should return first index', () => {
      const source = [1, 4, 3, 2];

      expect(indexOf(source, (_, idx) => idx === 0)).to.be.equal(0);
    });

    it('Should return last index', () => {
      const source = [1, 4, 3, 2, 5];

      expect(indexOf(source, (_, idx) => { return idx * 2 === 4; })).to.be.equal(2);
    });

    it('Should return the middle index', () => {
      const source = [1, 40, 3, 200, 1001];

      expect(indexOf(source, (_, idx) => idx === 2)).to.be.equal(2);
    });
  });
});
