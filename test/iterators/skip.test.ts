import { expect } from 'chai';
import { skip } from '../../lib/iterators/skip';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/skip', () => {
  describe('When called on empty array', () => {
    it('Should return empty array', () => {
      const source = [];
      const iterator = skip(source, 1);

      expect(toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When skipping all elements', () => {
    it('Should return empty array', () => {
      const source = [1, 2, 4, 8, 16, 32, 64];
      const iterator = skip(source, 100);

      expect(toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When skipping some elements', () => {
    it('Should return the remaining array', () => {
      const source = [1, 2, 4, 8, 16];
      const iterator = skip(source, 2);

      expect(toArray(iterator)).to.be.deep.equal([4, 8, 16]);
    });
    it('Should return the remaining array', () => {
      const source = [1, 2, 4, 8];
      const iterator = skip(source, 0);

      expect(toArray(iterator)).to.be.deep.equal([1, 2, 4, 8]);
    });
    it('Should return the remaining array', () => {
      const source = [1, 2, 4, 8, 16, 32];
      const iterator = skip(source, 4);

      expect(toArray(iterator)).to.be.deep.equal([16, 32]);
    });
  });

  describe('When skipping negative count', () => {
    it('Should return first 3 elements', () => {
      const source = [1, 2, 3, 2, 1];
      const iterator = skip(source, -2);

      expect(toArray(iterator)).to.be.deep.equal([1, 2, 3]);
    });

    it('Should return first 2 elements', () => {
      const source = ['a', 'b', 'c', 'ddd', 'asdf'];
      const iterator = skip(source, -3);

      expect(toArray(iterator)).to.be.deep.equal(['a', 'b']);
    });

    it('Should return empty source', () => {
      const source = ['a', 'b', 'c'];
      const iterator = skip(source, -3);

      expect(toArray(iterator)).to.be.deep.equal([]);
    });

    it('Should return first element', () => {
      const source = [-10, 10];
      const iterator = skip(source, -1);

      expect(toArray(iterator)).to.be.deep.equal([-10]);
    });

    it('Should return first 6 elements', () => {
      const source = [0, -1, 2, -3, 4, 5, 6];
      const iterator = skip(source, -1);

      expect(toArray(iterator)).to.be.deep.equal([0, -1, 2, -3, 4, 5]);
    });
  });
});
