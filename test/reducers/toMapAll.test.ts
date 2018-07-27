import { expect } from 'chai';
import { toArray } from '../../lib/reducers/toArray';
import { toMapAll } from '../../lib/reducers/toMapAll';

describe('reducers/toMapAll', () => {
  describe('When called on empty source', () => {
    it('Should return empty source', () => {
      const source = [];

      expect(toArray(toMapAll(source, x => x, x => x))).to.be.deep.equal([]);
    });
  });

  describe('When called on some source', () => {
    it('Should return map of 3 elements', () => {
      const source = [1, 2, 3];

      expect(toArray(toMapAll(source, x => x, x => x))).to.be.deep.equal([
        [1, [1]],
        [2, [2]],
        [3, [3]],
      ]);
    });

    it('Should return map of 4 elements', () => {
      const source = 'asdfaa';

      expect(toArray(toMapAll(source, x => x, x => x + 'b'))).to.be.deep.equal([
        ['a', ['ab', 'ab', 'ab']],
        ['s', ['sb']],
        ['d', ['db']],
        ['f', ['fb']],
      ]);
    });

    it('Should return map of 5 elements', () => {
      const source = new Set([
        { val: 1, a: 'a' },
        { val: 2, a: 'b' },
        { val: 2, a: 'c' },
      ]);

      expect(toArray(toMapAll(source, x => x.val, x => x.a))).to.be.deep.equal([
        [1, ['a']],
        [2, ['b', 'c']],
      ]);
    });
  });
});
