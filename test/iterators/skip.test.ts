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
});
