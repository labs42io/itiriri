import { expect } from 'chai';
import { default as itiriri } from '../../lib';
import { SpyIterable } from '../helpers/SpyIterable';

describe('Itiriri (set)', () => {
  describe('When calling distinct', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([0, 1, 2, 2, 1]);
      itiriri(source).distinct(x => x);

      expect(source.iterated).to.be.false;
    });

    it('Should return array of 2 elements', () => {
      const source = [0, 4, 4, 0];
      const q = itiriri(source).distinct(x => x);

      expect(q.toArray()).to.be.deep.equal([0, 4]);
    });

    it('Should return array of 3 elements', () => {
      const source = [
        { val: 1, tag: 'a' },
        { val: 2, tag: 'b' },
        { val: 3, tag: 'a' },
        { val: 4, tag: 'a' },
        { val: 5, tag: 'b' },
        { val: 6, tag: 'c' },
      ];
      const q = itiriri(source).distinct(x => x.tag);

      expect(q.toArray()).to.be.deep.equal([
        { val: 1, tag: 'a' },
        { val: 2, tag: 'b' },
        { val: 6, tag: 'c' },
      ]);
    });

    it('Should be iterable multiple times', () => {
      const source = [0, 4, 4, 0];
      const q = itiriri(source).distinct(x => x);

      for (const _ of q) { }
      expect(q.toArray()).to.be.deep.equal([0, 4]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      itiriri(source).distinct().toArray();

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling exclude', () => {
    it('Should be a deferred method', () => {
      const source1 = new SpyIterable([0, 1, 2, 2, 1]);
      const source2 = new SpyIterable([0, 1]);
      itiriri(source1).exclude(source2, x => x);

      expect(source1.iterated).to.be.false;
      expect(source2.iterated).to.be.false;
    });

    it('Should return array of 2 elements', () => {
      const source1 = [0, 4, 4, 0];
      const source2 = [0, 5];
      const q = itiriri(source1).exclude(source2, x => x);

      expect(q.toArray()).to.be.deep.equal([4, 4]);
    });

    it('Should return array of 3 elements', () => {
      const source1 = [
        { val: 1, tag: 'a' },
        { val: 2, tag: 'b' },
        { val: 3, tag: 'a' },
        { val: 4, tag: 'a' },
        { val: 5, tag: 'b' },
        { val: 6, tag: 'c' },
      ];
      const source2 = [{ val: 10, tag: 'a' }];
      const q = itiriri(source1).exclude(source2, x => x.tag);

      expect(q.toArray()).to.be.deep.equal([
        { val: 2, tag: 'b' },
        { val: 5, tag: 'b' },
        { val: 6, tag: 'c' },
      ]);
    });

    it('Should be iterable multiple times', () => {
      const source1 = [0, 4, 4, 0];
      const source2 = [0, 5];
      const q = itiriri(source1).exclude(source2, x => x);

      for (const _ of q) { }
      expect(q.toArray()).to.be.deep.equal([4, 4]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      itiriri(source).exclude([]).toArray();

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling intersect', () => {
    it('Should be a deferred method', () => {
      const source1 = new SpyIterable([0, 1, 2, 2, 1]);
      const source2 = new SpyIterable([0, 1]);
      itiriri(source1).intersect(source2, x => x);

      expect(source1.iterated).to.be.false;
      expect(source2.iterated).to.be.false;
    });

    it('Should return array of 2 elements', () => {
      const source1 = [0, 4, 4, 0, 1];
      const source2 = [0, 5, 4];
      const q = itiriri(source1).intersect(source2, x => x);

      expect(q.toArray()).to.be.deep.equal([0, 4]);
    });

    it('Should return array of 1 elements', () => {
      const source1 = [
        { val: 1, tag: 'a' },
        { val: 2, tag: 'b' },
        { val: 3, tag: 'a' },
        { val: 4, tag: 'a' },
        { val: 5, tag: 'b' },
        { val: 6, tag: 'c' },
      ];
      const source2 = [{ val: 10, tag: 'a' }];
      const q = itiriri(source1).intersect(source2, x => x.tag);

      expect(q.toArray()).to.be.deep.equal([{ val: 1, tag: 'a' }]);
    });

    it('Should be iterable multiple times', () => {
      const source1 = [0, 4, 4, 0, 1];
      const source2 = [0, 5, 4];
      const q = itiriri(source1).intersect(source2, x => x);

      for (const _ of q) { }
      expect(q.toArray()).to.be.deep.equal([0, 4]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      itiriri(source).intersect([]).toArray();

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling union', () => {
    it('Should be a deferred method', () => {
      const source1 = new SpyIterable([0, 1, 2, 2, 1]);
      const source2 = new SpyIterable([0, 1]);
      itiriri(source1).union(source2, x => x);

      expect(source1.iterated).to.be.false;
      expect(source2.iterated).to.be.false;
    });

    it('Should return array of 4 elements', () => {
      const source1 = [0, 4, 4, 0, 1];
      const source2 = [0, 5, 4];
      const q = itiriri(source1).union(source2, x => x);

      expect(q.toArray()).to.be.deep.equal([0, 4, 1, 5]);
    });

    it('Should return array of 3 elements', () => {
      const source1 = [
        { val: 1, tag: 'a' },
        { val: 11, tag: 'b' },
        { val: 111, tag: 'a' },
        { val: 1111, tag: 'c' },
      ];
      const source2 = [{ val: 10, tag: 'a' }];
      const q = itiriri(source1).union(source2, x => x.tag);

      expect(q.toArray()).to.be.deep.equal([
        { val: 1, tag: 'a' },
        { val: 11, tag: 'b' },
        { val: 1111, tag: 'c' },
      ]);
    });

    it('Should be iterable multiple times', () => {
      const source1 = [0, 4, 4, 0, 1];
      const source2 = [0, 5, 4];
      const q = itiriri(source1).union(source2, x => x);

      for (const _ of q) { }
      expect(q.toArray()).to.be.deep.equal([0, 4, 1, 5]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      itiriri(source).union([]).toArray();

      expect(source.iteratedOnce).to.be.true;
    });
  });
});
