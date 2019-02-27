import { expect } from 'chai';
import { default as itiriri } from '../../lib';
import { toArray } from '../../lib/reducers/toArray';

describe('Itiriri (cast)', () => {
  describe('When calling toArray', () => {
    it('Should return the array', () => {
      const source = [0, 4, 4, 0, 1];
      const q = itiriri(source);

      expect(q.toArray()).to.deep.equal(source);
    });

    it('Should return the array of transformed items', () => {
      const source = [1, 2, 3];
      const q = itiriri(source);

      expect(q.toArray(e => e * 10)).to.deep.equal([10, 20, 30]);
    });
  });

  describe('When calling toMap', () => {
    it('Should throw error', () => {
      const source = [0, 4, 4, 0, 1];
      const q = itiriri(source);

      expect(() => q.toMap(x => x)).to.throw(Error);
    });

    it('Should return map of 3 elements', () => {
      const source = [0, 4, 5];
      const q = itiriri(source).toMap(x => x, x => x);

      expect(toArray(q)).to.deep.equal([[0, 0], [4, 4], [5, 5]]);
    });

    it('Should return map of 4 elements', () => {
      const source = [1, 4, 44, 11];
      const q = itiriri(source).toMap(x => x, x => x % 10);

      expect(toArray(q)).to.deep.equal([[1, 1], [4, 4], [44, 4], [11, 1]]);
    });
  });

  describe('When calling toSet', () => {
    it('Should return map of 4 elements', () => {
      const source = [0, 4, 5, 1];
      const q = itiriri(source).toSet();

      expect(toArray(q)).to.deep.equal([0, 4, 5, 1]);
    });

    it('Should return map of 2 elements', () => {
      const source = [1, 4, 4, 1];
      const q = itiriri(source).toSet();

      expect(toArray(q)).to.deep.equal([1, 4]);
    });
  });

  describe('When calling toGroups', () => {
    it('Should return map of 2 groups', () => {
      const source = [0, 4, 5, 1];
      const q = itiriri(source).toGroups(x => x % 2);

      expect(toArray(q)).to.deep.equal([[0, [0, 4]], [1, [5, 1]]]);
    });

    it('Should return map of 3 groups', () => {
      const source = [
        { val: 1, tag: 'a' },
        { val: 11, tag: 'b' },
        { val: 111, tag: 'a' },
        { val: 1111, tag: 'c' },
      ];
      const q = itiriri(source).toGroups(x => x.tag);

      expect(toArray(q)).to.deep.equal([
        ['a', [{ val: 1, tag: 'a' }, { val: 111, tag: 'a' }]],
        ['b', [{ val: 11, tag: 'b' }]],
        ['c', [{ val: 1111, tag: 'c' }]],
      ]);
    });

    it('Should return map of 4 groups', () => {
      const source = [0, 1, 3, -1, -2];
      const q = itiriri(source).toGroups((elem, idx) => idx % 4);

      expect(toArray(q)).to.deep.equal([
        [0, [0, -2]],
        [1, [1]],
        [2, [3]],
        [3, [-1]],
      ]);
    });
  });

  describe('When calling toString', () => {
    it('Should return string of 3 elements', () => {
      const source = [4, 1, 2];
      const q = itiriri(source);

      expect(q.toString()).to.be.equal('4,1,2');
    });

    it('Should return empty string', () => {
      const source = [];
      const q = itiriri(source);

      expect(q.toString()).to.be.equal('');
    });

    it('Should return string of 5 elements', () => {
      const source = [-1, null, 4, 1, 2];
      const q = itiriri(source);

      expect(q.toString()).to.be.equal('-1,,4,1,2');
    });

    it('Should return string of 4 elements', () => {
      const source = [
        { toString: () => 'a' },
        { toString: () => 'aa' },
        { toString: () => 'aaa' },
        { toString: () => 'aaaa' },
      ];
      const q = itiriri(source);

      expect(q.toString()).to.be.equal('a,aa,aaa,aaaa');
    });
  });
});
