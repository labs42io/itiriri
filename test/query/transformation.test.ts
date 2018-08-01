import { expect } from 'chai';
import { SpyIterable } from '../helpers/SpyIterable';
import { query } from '../../lib/Query';

describe('Query (transformation)', () => {
  describe('When calling map', () => {
    it('Should return array of 3 elements', () => {
      const source = new SpyIterable([0, -4, 4]);
      const q = query(source).map(x => x <= 0);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([true, true, false]);
    });

    it('Should return array of 4 element', () => {
      const source = new SpyIterable([0, -4, 4, 30]);
      const q = query(source).map((elem, idx) => elem + idx);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([0, -3, 6, 33]);
    });

    it('Should return array of 1 object', () => {
      const source = new SpyIterable([]);
      const q = query(source).filter(x => x);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([]);
    });
  });

  describe('When calling groupBy', () => {
    it('Should return array of 2 groups', () => {
      const source = new SpyIterable([0, -4, 4, -1]);
      const q = query(source).groupBy(x => x > 0);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([
        { source: [0, -4, -1], key: false },
        { source: [4], key: true },
      ]);
    });

    it('Should return array of 3 groups', () => {
      const source = new SpyIterable([
        { val: 1, tag: 'a' },
        { val: 2, tag: 'b' },
        { val: 3, tag: 'c' },
        { val: 4, tag: 'd' },
        { val: 5, tag: 'e' },
        { val: 6, tag: 'f' },
      ]);
      const q = query(source).groupBy(x => x.val % 3);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([
        { source: [{ val: 1, tag: 'a' }, { val: 4, tag: 'd' }], key: 1 },
        { source: [{ val: 2, tag: 'b' }, { val: 5, tag: 'e' }], key: 2 },
        { source: [{ val: 3, tag: 'c' }, { val: 6, tag: 'f' }], key: 0 },
      ]);
    });

    it('Should return array of 2 groups', () => {
      const source = new SpyIterable([0, 4, 4, 1]);
      const q = query(source).groupBy((elem, idx) => idx % 2);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([
        { source: [0, 4], key: 0 },
        { source: [4, 1], key: 1 },
      ]);
    });
  });
});
