import { expect } from 'chai';
import { map } from '../../lib/iterators/map';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/map', () => {
  describe('When applying identity transformation', () => {
    it('Should return the same elements', () => {
      const source = [1, 2, 4, 8, 16];
      const iterator = map(source, elem => elem);

      expect(toArray(iterator)).to.be.deep.equal([1, 2, 4, 8, 16]);
    });
    it('Should return the same elements', () => {
      const source = [1.1, 2.2, 4.4, 8.8, 16.16];
      const iterator = map(source, elem => elem);

      expect(toArray(iterator)).to.be.deep.equal([1.1, 2.2, 4.4, 8.8, 16.16]);
    });
  });

  describe('When applying linear transformation', () => {
    it('Should return the elements modified', () => {
      const source = [1, 2, 4, 8];
      const iterator = map(source, elem => elem * 2 + 2);

      expect(toArray(iterator)).to.be.deep.equal([4, 6, 10, 18]);
    });
    it('Should return the elements modified', () => {
      const source = ['a', 'b', 'c', 'd'];
      const iterator = map(source, elem => `${elem}a`);

      expect(toArray(iterator)).to.be.deep.equal(['aa', 'ba', 'ca', 'da']);
    });
  });

  describe('When called on empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const iterator = map(source, (elem, idx) => elem + idx + 1234);

      expect(toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When applying index transformation', () => {
    it('Should return the array indexes', () => {
      const source = [10, 1, 1, 2, 3];
      const iterator = map(source, (_, idx) => idx);

      expect(toArray(iterator)).to.be.deep.equal([0, 1, 2, 3, 4]);
    });
  });

  describe('When applying index and value transformation', () => {
    it('Should return the index+value array', () => {
      const source = [2, 3, 4, 3, 2];
      const iterator = map(source, (elem, idx) => idx + elem);

      expect(toArray(iterator)).to.be.deep.equal([2, 4, 6, 6, 6]);
    });

    it('Should return the object.property + 2*index', () => {
      const source = [{ karma: 2 }, { karma: 4 }];
      const iterator = map(source, (elem, idx) => elem.karma + 2 * idx);

      expect(toArray(iterator)).to.be.deep.equal([2, 6]);
    });
  });
});
