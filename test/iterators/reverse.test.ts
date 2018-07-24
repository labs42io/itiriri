import { expect } from 'chai';
import { reverse } from '../../lib/iterators/reverse';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/reverse', () => {
  describe('When reversing empty array', () => {
    it('Should return empty array', () => {
      const source = [];
      const iterator = reverse(source);
      expect(toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When reversing one element', () => {
    it('Should return the same element', () => {
      const source = [8];
      const iterator = reverse(source);
      expect(toArray(iterator)).to.be.deep.equal([8]);
    });
  });

  describe('When reversing multiple elements', () => {
    it('Should return elements in reverse order', () => {
      const source = [1, 2, 3];
      const iterator = reverse(source);
      expect(toArray(iterator)).to.be.deep.equal([3, 2, 1]);
    });
    it('Should return elements in reverse order', () => {
      const source = [1, 2];
      const iterator = reverse(source);
      expect(toArray(iterator)).to.be.deep.equal([2, 1]);
    });
    it('Should return elements in reverse order', () => {
      const source = [1, 2, 4, 8, 16];
      const iterator = reverse(source);
      expect(toArray(iterator)).to.be.deep.equal([16, 8, 4, 2, 1]);
    });
  });
});
