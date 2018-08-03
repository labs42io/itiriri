import { expect } from 'chai';
import { nth } from '../../lib/reducers/nth';

describe('reducers/at', () => {
  describe('When accessing an element that exists', () => {
    it('Should return the element from first position', () => {
      const source = [1, 2, 3, 4, 5];
      expect(nth(source, 0)).to.be.equal(1);
    });

    it('Should return the element from a middle position', () => {
      const source = [1, 2, 3, 4, 5];
      expect(nth(source, 2)).to.be.equal(3);
    });

    it('Should return the element from last position', () => {
      const source = [1, 2, 3, 4, 5];
      expect(nth(source, 4)).to.be.equal(5);
    });
  });

  describe('When accessing an element that does not exist', () => {
    it('Should return undefined (positive index)', () => {
      const source = [1, 2];
      expect(nth(source, 100)).to.be.undefined;
    });
    it('Should return undefined (negative index)', () => {
      const source = [1, 2, 6, 3];
      expect(nth(source, -10)).to.be.undefined;
    });
  });

  describe('When accessing negative index element', () => {
    it('Should return last element', () => {
      const source = [32, 49, 3, 20];
      expect(nth(source, -1)).to.be.equal(20);
    });

    it('Should return a middle element', () => {
      const source = [1, 4, 1, 5];
      expect(nth(source, -2)).to.be.equal(1);
    });

    it('Should return first element', () => {
      const source = [4, 7, 2, 7];
      expect(nth(source, -4)).to.be.equal(4);
    });
  });
});
