import { expect } from 'chai';
import { SpyIterable } from '../helpers/SpyIterable';
import { query } from '../../lib/Query';

describe('Query (permutation)', () => {
  describe('When calling sort', () => {
    it('Should return array of 6 elements', () => {
      const source = new SpyIterable([0, -4, 4, 30, -10, 10]);
      const q = query(source).sort();

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([-10, -4, 0, 4, 10, 30]);
    });
    it('Should return array of 3 objects', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: -10, tag: 'c' },
      ]);
      const q = query(source).sort(x => x.val);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([
        { val: -10, tag: 'c' }, { val: 10, tag: 'a' }, { val: 20, tag: 'b' },
      ]);
    });
  });

  describe('When calling sortDesc', () => {
    it('Should return array of 6 elements', () => {
      const source = new SpyIterable([0, -4, 4, 30, -10, 10]);
      const q = query(source).sortDesc();

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([30, 10, 4, 0, -4, -10]);
    });
    it('Should return array of 3 objects', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: -10, tag: 'c' },
      ]);
      const q = query(source).sortDesc(x => x.val);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([
        { val: 20, tag: 'b' }, { val: 10, tag: 'a' }, { val: -10, tag: 'c' },
      ]);
    });
  });

  describe('When calling reverse', () => {
    it('Should return array of 6 elements', () => {
      const source = new SpyIterable([0, -4, 4, 30, -10, 10]);
      const q = query(source).reverse();

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([10, -10, 30, 4, -4, 0]);
    });
    it('Should return array of 3 objects', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: -10, tag: 'c' },
      ]);
      const q = query(source).reverse();

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([
        { val: -10, tag: 'c' }, { val: 20, tag: 'b' }, { val: 10, tag: 'a' },
      ]);
    });
  });

  describe('When calling shuffle', () => {
    it('Should return array of 6 elements', () => {
      const source = new SpyIterable([0, -4, 4, 30, -10, 10]);
      const q = query(source).shuffle();

      expect(source.wasIterated).to.be.false;
      const result = q.toArray();

      const resultCheck = query(result).sort().toArray();
      expect(resultCheck).to.be.deep.equal([-10, -4, 0, 4, 10, 30]);
    });
  });
});
