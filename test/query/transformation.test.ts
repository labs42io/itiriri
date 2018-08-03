import { expect } from 'chai';
import { SpyIterable } from '../helpers/SpyIterable';
import { query } from '../../lib/Query';

describe('Query (transformation)', () => {
  describe('When calling map', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([]);
      query(source).map(x => x);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 3 elements', () => {
      const source = [0, -4, 4];
      const q = query(source).map(x => x <= 0);

      expect(q.toArray()).to.be.deep.equal([true, true, false]);
    });

    it('Should return array of 4 element', () => {
      const source = [0, -4, 4, 30];
      const q = query(source).map((elem, idx) => elem + idx);

      expect(q.toArray()).to.be.deep.equal([0, -3, 6, 33]);
    });

    it('Should return array of 1 object', () => {
      const source = [];
      const q = query(source).filter(x => x);

      expect(q.toArray()).to.be.deep.equal([]);
    });
  });

  describe('When calling groupBy', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([]);
      query(source).groupBy(x => x);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 2 groups', () => {
      const source = [0, -4, 4, -1];
      const q = query(source).groupBy(x => x > 0);

      expect(q.toArray()).to.be.deep.equal([
        [false, { source: [0, -4, -1] }],
        [true, { source: [4] }],
      ]);
    });

    it('Should return array of 3 groups', () => {
      const source = [
        { val: 1, tag: 'a' },
        { val: 2, tag: 'b' },
        { val: 3, tag: 'c' },
        { val: 4, tag: 'd' },
        { val: 5, tag: 'e' },
        { val: 6, tag: 'f' },
      ];
      const q = query(source).groupBy(x => x.val % 3);

      expect(q.toArray()).to.be.deep.equal([
        [1, { source: [{ val: 1, tag: 'a' }, { val: 4, tag: 'd' }] }],
        [2, { source: [{ val: 2, tag: 'b' }, { val: 5, tag: 'e' }] }],
        [0, { source: [{ val: 3, tag: 'c' }, { val: 6, tag: 'f' }] }],
      ]);
    });

    it('Should return array of 2 groups', () => {
      const source = [0, 4, 4, 1];
      const q = query(source).groupBy((elem, idx) => idx % 2);

      expect(q.toArray()).to.be.deep.equal([
        [0, { source: [0, 4] }],
        [1, { source: [4, 1] }],
      ]);
    });
  });

  describe('When calling flat', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([]);
      query(source).flat(x => x);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 5 elements', () => {
      const source = [[1, 2, 3], [4, 5]];
      const q = query(source).flat((elem, idx) => {
        const res = [];

        elem.forEach((element) => {
          res.push(element);
        });

        return res;
      });

      expect(q.toArray()).to.be.deep.equal([1, 2, 3, 4, 5]);
    });
  });
});
