import { expect } from 'chai';
import { toSet } from '../../lib/reducers/toSet';
import { toArray } from '../../lib/reducers/toArray';

describe('reducers/toSet', () => {
  describe('When called on empty source', () => {
    it('Should return empty source', () => {
      const source = [];

      expect(toArray(toSet(source))).to.be.deep.equal([]);
    });
  });

  describe('When called on some source', () => {
    it('Should return array of 3 elements', () => {
      const source = [1, 2, 3];

      expect(toArray(toSet(source))).to.be.deep.equal([1, 2, 3]);
    });

    it('Should return array of 4 elements', () => {
      const source = 'asdf';

      expect(toArray(toSet(source))).to.be.deep.equal(['a', 's', 'd', 'f']);
    });

    it('Should return array of 5 elements', () => {
      const source = new Set([5, 4, 3, 2, 1]);

      expect(toArray(toSet(source))).to.be.deep.equal([5, 4, 3, 2, 1]);
    });
  });
});
