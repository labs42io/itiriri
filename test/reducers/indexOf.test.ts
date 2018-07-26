import { expect } from 'chai';
import { indexOf } from '../../lib/reducers/indexOf';

describe('reducers/indexOf', () => {
  describe('When called on empty array', () => {
    it('Should return -1', () => {
      const source = [];

      expect(indexOf(source, (elem, idx) => true)).to.be.equal(-1);
    });
  });

  describe('When calle on some array', () => {
    it('Should return the index 3', () => {
      const source = [4, 5, 1, 20, 3];

      expect(indexOf(source, (elem, idx) => elem === 20)).to.be.equal(3);
    });

    it('Should return the index 0', () => {
      const source = [1, 2, 1, 3, 4];

      expect(indexOf(source, (elem, idx) => elem === 1)).to.be.equal(0);
    });

    it('Should return -1 if elements does not exist', () => {
      const source = ['a', 'b', 'z', 'aa', 'abc'];
      expect(indexOf(source, (elem, idx) => elem === 'c')).to.be.equal(-1);
    });

    it('Should return the index of last element', () => {
      const source = [5, 7, 1, 3];

      expect(indexOf(source, (elem, idx) => elem === 3)).to.be.equal(3);
    });
  });
});
