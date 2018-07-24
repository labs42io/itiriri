import { expect } from 'chai';
import { first } from '../../lib/reducers/first';

describe('reducers/first', () => {
  describe('When calling on some source', () => {
    it('Should return the first element', () => {
      const arr = [1, 2, 3];

      expect(first(arr)).to.be.deep.equal(1);
    });
    it('Should return the first element', () => {
      const arr = [-1, 2, 3];

      expect(first(arr)).to.be.deep.equal(-1);
    });
    it('Should return the first element', () => {
      const arr = [100, 1, 2, 3];

      expect(first(arr)).to.be.deep.equal(100);
    });
  });

  describe('When calling on empty source', () => {
    it('Should return undefined', () => {
      const arr = [];

      expect(first(arr)).to.be.undefined;
    });
  });
});
