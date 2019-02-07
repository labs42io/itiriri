import { expect } from 'chai';
import { toArray } from '../../lib/reducers/toArray';
import { toMap } from '../../lib/reducers/toMap';

describe('reducers/toMap', () => {
  describe('When called on empty source', () => {
    it('Should return empty source', () => {
      const source = [];

      expect(toArray(toMap(source, x => x, x => x))).to.be.deep.equal([]);
    });
  });

  describe('When called on some source', () => {
    it('Should return set of 3 elements', () => {
      const source = [1, 2, 3];

      expect(toArray(toMap(source, x => x, x => x))).to.be.deep.equal([
        [1, 1], [2, 2], [3, 3],
      ]);
    });

    it('Should return set of 4 elements', () => {
      const source = 'asdf';

      expect(toArray(toMap(source, x => x, x => `${x}a`)))
        .to.be.deep.equal([
          ['a', 'aa'], ['s', 'sa'], ['d', 'da'], ['f', 'fa']],
        );
    });

    it('Should return set of 5 elements', () => {
      const source = new Set([5, 4, 3, 2, 1]);

      expect(toArray(toMap(source, x => 2 * x, x => x - 1)))
        .to.be.deep.equal([
          [10, 4], [8, 3], [6, 2], [4, 1], [2, 0]],
        );
    });

    it('Should throw an error for duplicate keys', () => {
      const source = 'asdfa';

      expect(() => toArray(toMap(source, x => x, x => `${x}a`)))
        .to.throw(Error, 'Duplicate map entry key: a.');
    });
  });
});
