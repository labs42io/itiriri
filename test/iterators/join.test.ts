import { expect } from 'chai';
import { join } from '../../lib/iterators/join';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/join', () => {
  describe('When called on empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const others = [];
      const iterator = join(source, others, x => x, x => x, (e1, e2) => ({ e1, e2 }));

      expect(toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When called on some source', () => {
    it('Should return common values', () => {
      const source = [1, 2, 3, 4];
      const others = [3, 4, 5, 6];
      const iterator = join(source, others, x => x, x => x, x => x);

      expect(toArray(iterator)).to.be.deep.equal([3, 4]);
    });

    it('Should return objects with common property', () => {
      const source = [
        { name: 'Football', awesomeness: 20 },
        { name: 'Chess', awesomeness: 30 },
        { name: 'Hockey', awesomeness: 40 },
      ];
      const others = [
        { name: 'Russia', awesomeness: 30 },
        { name: 'Norway', awesomeness: 20 },
        { name: 'France', awesomeness: 40 },
      ];
      const iterator = join(
        source,
        others,
        x => x.awesomeness,
        x => x.awesomeness,
        (e1, e2) => 'Playing ' + e1.name + ' in ' + e2.name,
      );

      expect(toArray(iterator)).to.be.deep.equal([
        'Playing Football in Norway',
        'Playing Chess in Russia',
        'Playing Hockey in France',
      ]);
    });
  });
});
