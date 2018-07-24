import { expect } from 'chai';
import { fromArray } from '../../lib/iterators/fromArray';
import { take } from '../../lib/iterators/take';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/take', () => {
  describe('When take 0 elements', () => {
    it('Should return empty source', () => {
      const source = fromArray([1, 2]);
      const iterator = take(source, 0);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When take some elements', () => {
    it('Should return the elements', () => {
      const source = fromArray([1, 2, 3, 4, 5, 6]);
      const iterator = take(source, 4);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4]);
    });
  });

  describe('When take all elements', () => {
    it('Should return all elements', () => {
      const source = fromArray([1, 2, 3, 4, 5, 6]);
      const iterator = take(source, 6);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('When take more than all elements', () => {
    it('Should return all elements', () => {
      const source = fromArray([1, 2, 3]);
      const iterator = take(source, 10);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When take negative count', () => {
    it('Should return from the tail', () => {
      const source = fromArray([1, 2, 3, 4]);
      const iterator = take(source, -3);

      expect(toArray(iterator)).to.deep.equal([2, 3, 4]);
    });
  });

  describe('When take negative count of source size', () => {
    it('Should return the whole source', () => {
      const source = fromArray([1, 2, 3, 4, 5]);
      const iterator = take(source, -5);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe('When take negative count of more than source size', () => {
    it('Should return the whole source', () => {
      const source = fromArray([1, 2, 3, 4]);
      const iterator = take(source, -100);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4]);
    });
  });
});
