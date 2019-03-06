import { expect } from 'chai';
import { SpyIterable } from '../helpers/SpyIterable';
import { default as itiriri } from '../../lib';

describe('Itiriri (predicate)', () => {
  describe('When calling includes', () => {
    it('Should return true on array', () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = itiriri(source);

      expect(q.includes(4)).to.be.true;
    });

    it('Should return false on empty source', () => {
      const source: number[] = [];
      const q = itiriri(source);

      expect(q.includes(0)).to.be.false;
    });

    it('Should return false when using fromIndex', () => {
      const source = [1, 2, 3, 4];
      const q = itiriri(source);

      expect(q.includes(1, 1)).to.be.false;
    });

    it('Should iterate once', () => {
      const source = new SpyIterable<number>([]);
      itiriri(source).includes(1);

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling every', () => {
    it('Should return true on array', () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = itiriri(source);

      expect(q.every(x => x >= 0)).to.be.true;
    });

    it('Should return true on empty source', () => {
      const source = [];
      const q = itiriri(source);

      expect(q.every(x => x * 20 === 0)).to.be.true;
    });

    it('Should return false on array of objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = itiriri(source);

      expect(q.every(x => x.val <= 10)).to.be.false;
    });

    it('Should return true on array of objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = itiriri(source);

      expect(q.every((_, idx) => idx < 10)).to.be.true;
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      itiriri(source).every(_ => true);

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling some', () => {
    it('Should return true on array', () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = itiriri(source);

      expect(q.some(x => x >= 30)).to.be.true;
    });

    it('Should return true on empty source', () => {
      const source = [];
      const q = itiriri(source);

      expect(q.some(x => x * 20 === 0)).to.be.false;
    });

    it('Should return false on array of objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = itiriri(source);

      expect(q.some(x => x.val < -10)).to.be.false;
    });

    it('Should return true on array of objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = itiriri(source);

      expect(q.some((_, idx) => idx < 10)).to.be.true;
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      itiriri(source).some(_ => true);

      expect(source.iteratedOnce).to.be.true;
    });
  });
});
