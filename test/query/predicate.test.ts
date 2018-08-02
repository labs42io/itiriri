import { expect } from 'chai';
import { SpyIterable } from '../helpers/SpyIterable';
import { query } from '../../lib/Query';

describe('Query (predicate)', () => {
  describe('When calling includes', () => {
    it('Should return true on array', () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = query(source);

      expect(q.includes(4)).to.be.true;
    });

    it('Should return false on empty source', () => {
      const source = [];
      const q = query(source);

      expect(q.includes(0)).to.be.false;
    });
  });

  describe('When calling every', () => {
    it('Should return true on array', () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = query(source);

      expect(q.every(x => x >= 0)).to.be.true;
    });

    it('Should return true on empty source', () => {
      const source = [];
      const q = query(source);

      expect(q.every(x => x * 20 === 0)).to.be.true;
    });

    it('Should return false on array of objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source);

      expect(q.every(x => x.val <= 10)).to.be.false;
    });

    it('Should return true on array of objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source);

      expect(q.every((elem, idx) => idx < 10)).to.be.true;
    });
  });

  describe('When calling some', () => {
    it('Should return true on array', () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = query(source);

      expect(q.some(x => x >= 30)).to.be.true;
    });

    it('Should return true on empty source', () => {
      const source = [];
      const q = query(source);

      expect(q.some(x => x * 20 === 0)).to.be.false;
    });

    it('Should return false on array of objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source);

      expect(q.some(x => x.val < -10)).to.be.false;
    });

    it('Should return true on array of objects', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source);

      expect(q.some((elem, idx) => idx < 10)).to.be.true;
    });
  });
});
