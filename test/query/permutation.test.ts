import { expect } from 'chai';
import { SpyIterable } from '../helpers/SpyIterable';
import { query } from '../../lib/Query';
import { toArray } from '../../lib/reducers/toArray';

describe('Query (permutation)', () => {
  describe('When calling sort', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([1, 4, 2]);
      query(source).sort();

      expect(source.iterated).to.be.false;
    });

    it('Should return array of 6 elements', () => {
      const source = [0, -4, 4, 30, 4, 10];
      const q = query(source).sort();

      expect(q.toArray()).to.be.deep.equal([-4, 0, 4, 4, 10, 30]);
    });

    it('Should return array of 3 objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source).sort((e1, e2) => e1.val < e2.val ? -1 : 1);

      expect(q.toArray()).to.be.deep.equal([
        { val: -10, tag: 'c' },
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
      ]);
    });

    it('Should be iterable multiple times', () => {
      const source = [2, 1, 3];
      const q = query(source).sort();

      for (const _ of q) { }
      expect(q.toArray()).to.be.deep.equal([1, 2, 3]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      query(source).sort().toArray();

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling reverse', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([1, 4, 2]);
      query(source).reverse();

      expect(source.iterated).to.be.false;
    });

    it('Should return array of 6 elements', () => {
      const source = [0, -4, 4, 30, -10, 10];
      const q = query(source).reverse();

      expect(q.toArray()).to.be.deep.equal([10, -10, 30, 4, -4, 0]);
    });

    it('Should return array of 3 objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source).reverse();

      expect(q.toArray()).to.be.deep.equal([
        { val: -10, tag: 'c' },
        { val: 20, tag: 'b' },
        { val: 10, tag: 'a' },
      ]);
    });

    it('Should be iterable multiple times', () => {
      const source = [1, 2, 3];
      const q = query(source).reverse();

      for (const _ of q) { }
      expect(q.toArray()).to.be.deep.equal([3, 2, 1]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      query(source).reverse().toArray();

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling shuffle', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([1, 4, 2]);
      query(source).shuffle();

      expect(source.iterated).to.be.false;
    });

    it('Should return array of 6 elements', () => {
      const source = [0, -4, 4, 30, -10, 10];
      const q = query(source).shuffle();
      const resultCheck = query(toArray(q)).sort().toArray();

      expect(resultCheck).to.be.deep.equal([-10, -4, 0, 4, 10, 30]);
    });

    it('Should be iterable multiple times', () => {
      const source = [1, 2, 3];
      const q = query(source).shuffle();

      for (const _ of q) { }
      expect(q.toArray().sort()).to.be.deep.equal([1, 2, 3]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      query(source).shuffle().toArray();

      expect(source.iteratedOnce).to.be.true;
    });
  });
});
