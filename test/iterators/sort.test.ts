import { expect } from 'chai';
import { sort } from '../../lib/iterators/sort';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/sort', () => {
  describe('When sorting empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When sorting some numbers', () => {
    it('Should return sorted numbers', () => {
      const source = [4, 3, 2, 5, 6, 3, 1, 0];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal([0, 1, 2, 3, 3, 4, 5, 6]);
    });

    it('Should return sorted numbers', () => {
      const source = [4, 3, 2, 5, 6, -3, -1, 0];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal([-3, -1, 0, 2, 3, 4, 5, 6]);
    });

    it('Should return sorted numbers', () => {
      const source = [3];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal([3]);
    });

    it('Should return sorted numbers', () => {
      const source = [1, -1];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal([-1, 1]);
    });
  });

  describe('When sorting strings', () => {
    it('Should return them in lexicographic order', () => {
      const source = ['ab', 'aa', 'cc', 'abc'];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal(['aa', 'ab', 'abc', 'cc']);
    });

    it('Should return them in lexicographic order', () => {
      const source = ['fb', 'aa', 'cc', 'abc'];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal(['aa', 'abc', 'cc', 'fb']);
    });
  });

  describe('When sorting floats', () => {
    it('Should return them ordered', () => {
      const source = [0.3, 0.4, 0.1, 0.002];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal([0.002, 0.1, 0.3, 0.4]);
    });
    it('Should return them ordered', () => {
      const source = [0.3, 0.4, 0.001, 0.002];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal([0.001, 0.002, 0.3, 0.4]);
    });
    it('Should return them ordered', () => {
      const source = [10.3, 5.4];
      const iterator = sort(source, (x) => { x; });

      expect(toArray(iterator)).to.deep.equal([5.4, 10.3]);
    });
  });

  describe('When sorting numbers descending', () => {
    it('Should return them orderd descending', () => {
      const source = [4, 3, 1, 23, 4, -1];
      const iterator = sort(source, (x) => { x; }, true);

      expect(toArray(iterator)).to.deep.equal([23, 4, 4, 3, 1, -1]);
    });
    it('Should return them orderd descending', () => {
      const source = [0, 1, 3, -1, -5, 100];
      const iterator = sort(source, (x) => { x; }, true);

      expect(toArray(iterator)).to.deep.equal([100, 3, 1, 0, -1, -5]);
    });
    it('Should return them orderd descending', () => {
      const source = [0, 1, 3, 4];
      const iterator = sort(source, (x) => { x; }, true);

      expect(toArray(iterator)).to.deep.equal([4, 3, 1, 0]);
    });
  });

  describe('When sorting strings descending', () => {
    it('Should return them orderd descending (lexicographic)', () => {
      const source = ['a', 'ab', 'ccd', 'xzv'];
      const iterator = sort(source, (x) => { x; }, true);

      expect(toArray(iterator)).to.deep.equal(['xzv', 'ccd', 'ab', 'a']);
    });
    it('Should return them orderd descending (lexicographic)', () => {
      const source = ['abc', 'ac', 'a'];
      const iterator = sort(source, (x) => { x; }, true);

      expect(toArray(iterator)).to.deep.equal(['ac', 'abc', 'a']);
    });
  });

  describe('When sorting floats descending', () => {
    it('Should return them orderd descending', () => {
      const source = [0.1, 0.2, 0.134, 3.14];
      const iterator = sort(source, (x) => { x; }, true);

      expect(toArray(iterator)).to.deep.equal([3.14, 0.2, 0.134, 0.1]);
    });
    it('Should return them orderd descending', () => {
      const source = [1.1, 100.0];
      const iterator = sort(source, (x) => { x; }, true);

      expect(toArray(iterator)).to.deep.equal([100.0, 1.1]);
    });
  });
});
