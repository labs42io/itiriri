import { expect } from 'chai';
import { at } from '../../lib/reducers/at';

describe('reducers/at', () => {
  describe('When accessing an element that exists', () => {
    it('Should return the element', () => {
      const source = [1, 2, 3, 4, 5];
      expect(at(source, 0)).to.be.equal(1);
    });

    it('Should return the element', () => {
      const source = [1, 2, 3, 4, 5];
      expect(at(source, 1)).to.be.equal(2);
    });

    it('Should return the element', () => {
      const source = [1, 2, 3, 4, 5];
      expect(at(source, 2)).to.be.equal(3);
    });
  });

  describe('When accessing an element that does not exist', () => {
    it('Should return undefined (positive index)', () => {
      const source = [1, 2];
      expect(at(source, 100)).to.be.undefined;
    });
    it('Should return undefined (negative index)', () => {
      const source = [1, 2, 6, 3];
      expect(at(source, -10)).to.be.undefined;
    });
  });

  describe('When accessing negative index element', () => {
    it('Should return 1', () => {
      const source = [1, 4, 1, 5];
      expect(at(source, -2)).to.be.equal(1);
    });

    it('Should return last element', () => {
      const source = [32, 49, 3, 20];
      expect(at(source, -1)).to.be.equal(20);
    });

    it('Should return first element', () => {
      const source = [4, 7, 2, 7];
      expect(at(source, -4)).to.be.equal(4);
    });
  });
});
