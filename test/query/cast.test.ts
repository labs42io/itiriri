import { expect } from 'chai';
import { query } from '../../lib/Query';
import { SpyIterable } from '../helpers/SpyIterable';

describe('Query (cast)', () => {
  describe('When calling toMap', () => {
    it('Should throw error', () => {
      const source = new SpyIterable([0, 4, 4, 0, 1]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(() => q.toMap(x => x)).to.throw(Error);
    });
    it('Should return map of 3 elements', () => {
      const source = new SpyIterable([0, 4, 5]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;

      const result = q.toMap(x => x, x => x);

      expect(query(result).toArray()).to.deep.equal([[0, 0], [4, 4], [5, 5]]);
    });
    it('Should return map of 4 elements', () => {
      const source = new SpyIterable([1, 4, 44, 11]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;

      const result = q.toMap(x => x, x => x % 10);

      expect(query(result).toArray()).to.deep.equal([[1, 1], [4, 4], [44, 4], [11, 1]]);
    });
  });

  describe('When calling toSet', () => {
    it('Should return map of 4 elements', () => {
      const source = new SpyIterable([0, 4, 5, 1]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;

      const result = q.toSet();

      expect(query(result).toArray()).to.deep.equal([0, 4, 5, 1]);
    });

    it('Should return map of 2 elements', () => {
      const source = new SpyIterable([1, 4, 4, 1]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;

      const result = q.toSet();

      expect(query(result).toArray()).to.deep.equal([1, 4]);
    });
  });

  describe('When calling toGroups', () => {
    it('Should return map of 2 groups', () => {
      const source = new SpyIterable([0, 4, 5, 1]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;

      const result = q.toGroups(x => x % 2);

      expect(query(result).toArray()).to.deep.equal([[0, [0, 4]], [1, [5, 1]]]);
    });

    it('Should return map of 3 groups', () => {
      const source = new SpyIterable([
        { val: 1, tag: 'a' },
        { val: 11, tag: 'b' },
        { val: 111, tag: 'a' },
        { val: 1111, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;

      const result = q.toGroups(x => x.tag);

      expect(query(result).toArray()).to.deep.equal([
        ['a', [{ val: 1, tag: 'a' }, { val: 111, tag: 'a' }]],
        ['b', [{ val: 11, tag: 'b' }]],
        ['c', [{ val: 1111, tag: 'c' }]],
      ]);
    });

    it('Should return map of 4 groups', () => {
      const source = new SpyIterable([0, 1, 3, -1, -2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;

      const result = q.toGroups((elem, idx) => idx % 4);

      expect(query(result).toArray()).to.deep.equal([
        [0, [0, -2]],
        [1, [1]],
        [2, [3]],
        [3, [-1]],
      ]);
    });
  });

  describe('When calling toString', () => {
    it('Should return string of 3 elements', () => {
      const source = new SpyIterable([4, 1, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.toString()).to.be.equal('4,1,2');
    });
    it('Should return empty string', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.toString()).to.be.equal('');
    });
    it('Should return string of 5 elements', () => {
      const source = new SpyIterable([-1, null, 4, 1, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.toString()).to.be.equal('-1,,4,1,2');
    });
    it('Should return string of 4 elements', () => {
      const source = new SpyIterable([
        { toString: () => 'a' },
        { toString: () => 'aa' },
        { toString: () => 'aaa' },
        { toString: () => 'aaaa' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.toString()).to.be.equal('a,aa,aaa,aaaa');
    });
  });
});
