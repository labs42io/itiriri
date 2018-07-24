import { expect } from 'chai';
import { map } from '../../lib/iterators/map';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/map', () => {
  describe('When applying identity transformation', () => {
    it('Should return the same elements', () => {
      const source = [1, 2, 4, 8, 16];
      const iterator = map(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.be.deep.equal([1, 2, 4, 8, 16]);
    });
    it('Should return the same elements', () => {
      const source = [1.1, 2.2, 4.4, 8.8, 16.16];
      const iterator = map(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.be.deep.equal([1.1, 2.2, 4.4, 8.8, 16.16]);
    });
  });

  describe('When applying transformation', () => {
    it('Should return the elemens modified', () => {
      const source = [1, 2, 4, 8];
      const iterator = map(source, (elem, idx) => elem * 2 + 2);

      expect(toArray(iterator)).to.be.deep.equal([4, 6, 10, 18]);
    });
    it('Should return the elemens modified', () => {
      const source = ['a', 'b', 'c', 'd'];
      const iterator = map(source, (elem, idx) => elem + 'a');

      expect(toArray(iterator)).to.be.deep.equal(['aa', 'ba', 'ca', 'da']);
    });
  });
});
