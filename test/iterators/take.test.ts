import { expect } from 'chai';
import { take } from '../../lib/iterators/take';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/take', () => {
  describe('When take 0 elements', () => {
    it('Should return empty source', () => {
      const source = [1, 2];
      const iterator = take(source, 0);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When take some elements', () => {
    it('Should return 4 elements from front', () => {
      const source = [1, 2, 3, 4, 5, 6];
      const iterator = take(source, 4);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4]);
    });
    it('Should return 2 elements from front', () => {
      const source = [1, 2, 3, 4, 5];
      const iterator = take(source, 2);

      expect(toArray(iterator)).to.deep.equal([1, 2]);
    });
    it('Should return 1 element from front', () => {
      const source = [1, 2, 3];
      const iterator = take(source, 1);

      expect(toArray(iterator)).to.deep.equal([1]);
    });
  });

  describe('When take all elements', () => {
    it('Should return all elements', () => {
      const source = [1, 2, 3, 4, 5, 6];
      const iterator = take(source, 6);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('When take more than all elements', () => {
    it('Should return all elements', () => {
      const source = [1, 2, 3];
      const iterator = take(source, 10);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When take negative count', () => {
    it('Should return 3 elements from tail', () => {
      const source = [1, 2, 3, 4];
      const iterator = take(source, -3);

      expect(toArray(iterator)).to.deep.equal([2, 3, 4]);
    });
    it('Should return 5 elements from tail', () => {
      const source = [1, 2, 3, 4, 5, 6];
      const iterator = take(source, -5);

      expect(toArray(iterator)).to.deep.equal([2, 3, 4, 5, 6]);
    });
    it('Should return 1 element from tail', () => {
      const source = [1, 2, 3, 4, 5];
      const iterator = take(source, -1);

      expect(toArray(iterator)).to.deep.equal([5]);
    });
  });

  describe('When take negative count of source size', () => {
    it('Should return the whole source', () => {
      const source = [1, 2, 3, 4, 5];
      const iterator = take(source, -5);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe('When take negative count of more than source size', () => {
    it('Should return the whole source', () => {
      const source = [1, 2, 3, 4];
      const iterator = take(source, -100);

      expect(toArray(iterator)).to.deep.equal([1, 2, 3, 4]);
    });
  });

  describe('When take positive count from empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const iterator = take(source, 8);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When take negative count from empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const iterator = take(source, -16);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });
});
