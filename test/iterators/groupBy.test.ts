import { expect } from 'chai';
import { groupBy } from '../../lib/iterators/groupBy';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/groupBy', () => {
  describe('When calling on epmpty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const iterator = groupBy(source, x => x, x => x);

      expect(toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When called on some source', () => {
    it('Should return grouped values by value', () => {
      const source = [1, 4, 1, 5, 5, 5, 7, 8, 7];
      const iterator = groupBy(source, x => x, x => x);

      expect(toArray(iterator)).to.be.deep.equal([
        [1, [1, 1]],
        [4, [4]],
        [5, [5, 5, 5]],
        [7, [7, 7]],
        [8, [8]],
      ]);
    });

    it('Should return grouuped indexes by values', () => {
      const source = [4, 4, 5, 1, 5, 1];
      const iterator = groupBy(source, x => x, (elem, idx) => idx);

      expect(toArray(iterator)).to.be.deep.equal([
        [4, [0, 1]],
        [5, [2, 4]],
        [1, [3, 5]],
      ]);
    });

    it('Should return values grouped by odd/even index', () => {
      const source = [1, 22, 3, 44, 5, 66];
      const iterator = groupBy(source, (elem, idx) => idx % 2, x => x);

      expect(toArray(iterator)).to.be.deep.equal([
        [0, [1, 3, 5]],
        [1, [22, 44, 66]],
      ]);
    });

    it('Should return objects grouped by property', () => {
      const source = [
        { brand: 'Nike', price: 1200 },
        { brand: 'Adidas', price: 799 },
        { brand: 'Puma', price: 699 },
      ];
      const iterator = groupBy(
        source,
        (elem, idx) => elem.price % 100 !== 99, // if you don't like ..99 like prices
        x => x.brand,
      );

      expect(toArray(iterator)).to.be.deep.equal([
        [true, ['Nike']],
        [false, ['Adidas', 'Puma']],
      ]);
    });
  });
});
