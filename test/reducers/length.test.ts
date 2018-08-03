import { expect } from 'chai';
import { length } from '../../lib/reducers/length';

describe('reducers/length', () => {
  describe('When called on empty source', () => {
    it('Should return 0', () => {
      const arr = [];

      expect(length(arr)).to.equal(0);
    });
  });

  describe('When called on a non-empty source', () => {
    it('Should return length for 4 elements', () => {
      const arr = [0, 1, 2, 1];

      expect(length(arr)).to.equal(4);
    });
    it('Should return length for 1 element', () => {
      const arr = [0];

      expect(length(arr)).to.equal(1);
    });
    it('Should return length for 6 elements', () => {
      const arr = [0, 1, 1, 1, 0, 0];

      expect(length(arr)).to.equal(6);
    });
  });
});
