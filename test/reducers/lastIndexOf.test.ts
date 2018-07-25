import { expect } from 'chai';
import { lastIndexOf } from '../../lib/reducers/lastIndexOf';

describe('reducers/lastIndexOf', () => {
  describe('When called on empty array', () => {
    it('Should return -1', () => {
      const source = [];

      expect(lastIndexOf(source, (elem, idx) => true)).to.be.equal(-1);
    });
  });

  describe('When calle on some array', () => {
    it('Should return the index 3', () => {
      const source = [4, 5, 1, 20, 3];

      expect(lastIndexOf(source, (elem, idx) => elem === 20)).to.be.equal(3);
    });

    it('Should return the index 2', () => {
      const source = [1, 2, 1, 3, 4];

      expect(lastIndexOf(source, (elem, idx) => elem === 1)).to.be.equal(2);
    });

    it('Should return -1 if elements does not exist', () => {
      const source = ['a', 'b', 'z', 'aa', 'abc'];
      expect(lastIndexOf(source, (elem, idx) => elem === 'c')).to.be.equal(-1);
    });
  });
});
