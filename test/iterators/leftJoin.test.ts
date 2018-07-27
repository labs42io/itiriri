import { expect } from 'chai';
import { leftJoin } from '../../lib/iterators/leftJoin';
import { toArray } from '../../lib/reducers/toArray';

describe.only('iterators/leftJoin', () => {
  describe('When called on empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const others = [];
      const iterator = leftJoin(source, others, x => x, x => x, x => x);

      expect(toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When called on some source', () => {
    it('Should return 3 joined items', () => {
      const source = [1, 2, 3];
      const others = [2];
      const iterator = leftJoin(source, others, x => x, x => x, (x, y) => ({ x, y }));

      expect(toArray(iterator)).to.be.deep.equal([
        { x: 1, y: undefined },
        { x: 2, y: 2 },
        { x: 3, y: undefined },
      ]);
    });

    it('Should return 2 joined items', () => {
      const source = [1, 3];
      const others = [2];
      const iterator = leftJoin(source, others, x => x, x => x, (x, y) => ({ y, x: x * 10 }));

      expect(toArray(iterator)).to.be.deep.equal([
        { x: 10, y: undefined },
        { x: 30, y: undefined },
      ]);
    });

    it('Should return 4 joined items', () => {
      const source = ['a', 'b', 'c', 'd'];
      const others = ['add', 'eff', 'ccc'];
      const iterator = leftJoin(source, others, x => x, x => x[0], (x, y) => ({ x, y }));

      expect(toArray(iterator)).to.be.deep.equal([
        { x: 'a', y: 'add' },
        { x: 'b', y: undefined },
        { x: 'c', y: 'ccc' },
        { x: 'd', y: undefined },
      ]);
    });
  });
});
