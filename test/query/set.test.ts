import { expect } from 'chai';
import { query } from '../../lib/Itiriri';
import { SpyIterable } from '../helpers/SpyIterable';

describe('Query (set)', () => {
  describe('When calling distinct', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([0, 1, 2, 2, 1]);
      query(source).distinct(x => x);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 2 elements', () => {
      const source = [0, 4, 4, 0];
      const q = query(source).distinct(x => x);

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
      const q = query(source).distinct(x => x.tag);

      expect(q.toArray()).to.be.deep.equal([
        { val: 1, tag: 'a' },
        { val: 2, tag: 'b' },
        { val: 6, tag: 'c' },
      ]);
    });
  });

  describe('When calling exclude', () => {
    it('Should be a deferred method', () => {
      const source1 = new SpyIterable([0, 1, 2, 2, 1]);
      const source2 = new SpyIterable([0, 1]);
      query(source1).exclude(source2, x => x);

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return array of 2 elements', () => {
      const source1 = [0, 4, 4, 0];
      const source2 = [0, 5];
      const q = query(source1).exclude(source2, x => x);

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
      const q = query(source1).exclude(source2, x => x.tag);

      expect(q.toArray()).to.be.deep.equal([
        { val: 2, tag: 'b' },
        { val: 5, tag: 'b' },
        { val: 6, tag: 'c' },
      ]);
    });
  });

  describe('When calling intersect', () => {
    it('Should be a deferred method', () => {
      const source1 = new SpyIterable([0, 1, 2, 2, 1]);
      const source2 = new SpyIterable([0, 1]);
      query(source1).intersect(source2, x => x);

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return array of 2 elements', () => {
      const source1 = [0, 4, 4, 0, 1];
      const source2 = [0, 5, 4];
      const q = query(source1).intersect(source2, x => x);

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
      const q = query(source1).intersect(source2, x => x.tag);

      expect(q.toArray()).to.be.deep.equal([{ val: 1, tag: 'a' }]);
    });
  });

  describe('When calling union', () => {
    it('Should be a deferred method', () => {
      const source1 = new SpyIterable([0, 1, 2, 2, 1]);
      const source2 = new SpyIterable([0, 1]);
      query(source1).union(source2, x => x);

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return array of 4 elements', () => {
      const source1 = [0, 4, 4, 0, 1];
      const source2 = [0, 5, 4];
      const q = query(source1).union(source2, x => x);

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
      const q = query(source1).union(source2, x => x.tag);

      expect(q.toArray()).to.be.deep.equal([
        { val: 1, tag: 'a' },
        { val: 11, tag: 'b' },
        { val: 1111, tag: 'c' },
      ]);
    });
  });
});
