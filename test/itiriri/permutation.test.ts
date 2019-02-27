import { expect } from 'chai';
import { SpyIterable } from '../helpers/SpyIterable';
import { default as itiriri } from '../../lib';
import { toArray } from '../../lib/reducers/toArray';

describe('Itiriri (permutation)', () => {
  describe('When calling sort', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([1, 4, 2]);
      itiriri(source).sort();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 6 elements', () => {
      const source = [0, -4, 4, 30, 4, 10];
      const q = itiriri(source).sort();

      expect(q.toArray()).to.be.deep.equal([-4, 0, 4, 4, 10, 30]);
    });

    it('Should return array of 3 objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = itiriri(source).sort((e1, e2) => e1.val < e2.val ? -1 : 1);

      expect(q.toArray()).to.be.deep.equal([
        { val: -10, tag: 'c' },
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
      ]);
    });
  });

  describe('When calling reverse', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([1, 4, 2]);
      itiriri(source).reverse();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 6 elements', () => {
      const source = [0, -4, 4, 30, -10, 10];
      const q = itiriri(source).reverse();

      expect(q.toArray()).to.be.deep.equal([10, -10, 30, 4, -4, 0]);
    });

    it('Should return array of 3 objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = itiriri(source).reverse();

      expect(q.toArray()).to.be.deep.equal([
        { val: -10, tag: 'c' },
        { val: 20, tag: 'b' },
        { val: 10, tag: 'a' },
      ]);
    });
  });

  describe('When calling shuffle', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([1, 4, 2]);
      itiriri(source).shuffle();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 6 elements', () => {
      const source = [0, -4, 4, 30, -10, 10];
      const q = itiriri(source).shuffle();
      const resultCheck = itiriri(toArray(q)).sort().toArray();

      expect(resultCheck).to.be.deep.equal([-10, -4, 0, 4, 10, 30]);
    });
  });
});
