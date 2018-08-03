import { expect } from 'chai';
import { groupJoin } from '../../lib/iterators/groupJoin';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/groupJoin', () => {
  describe('When called on empty sources', () => {
    it('Should return empty sources', () => {
      const source = [];
      const others = [];
      const iterator = groupJoin(source, others, x => x, x => x, x => x);

      expect(toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When called on some sources', () => {
    it('Should return 3 grupped elemnts', () => {
      const source = [1, 2, 3];
      const others = [2, 2, 3, 3, 3, 4, 4];
      const iterator = groupJoin(source, others, x => x, x => x, (x, y) => ({ x, y }));

      expect(toArray(iterator)).to.be.deep.equal([
        { x: 1, y: [] },
        { x: 2, y: [2, 2] },
        { x: 3, y: [3, 3, 3] },
      ]);
    });

    it('Should return 2 grupped elemnts', () => {
      const source = [
        { val: 2, other: 'asdf' },
        { val: 3, other: 'ad' },
      ];
      const others = [
        { val: 3, y: 'a' },
        { val: 3, y: 'b' },
      ];
      const iterator = groupJoin(
        source,
        others,
        x => x.val,
        x => x.val,
        (x, y) => ({ y, x: x.val }),
      );

      expect(toArray(iterator)).to.be.deep.equal([
        { x: 2, y: [] },
        { x: 3, y: [{ val: 3, y: 'a' }, { val: 3, y: 'b' }] },
      ]);
    });
  });
});
