import { expect } from 'chai';
import { shuffle } from '../../lib/iterators/shuffle';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/shuffle', () => {
  describe('When shuffle an array', () => {
    it('Should contain the same 5 integers', () => {
      const source = [3, 4, 3, 1, 5];
      const iterator = shuffle(source);

      expect(toArray(iterator).sort()).to.be.deep.equal(source.sort());
    });

    it('Should contain the same 3 floats', () => {
      const source = [3.1, 4.1, 3.1];
      const iterator = shuffle(source);

      expect(toArray(iterator).sort()).to.be.deep.equal(source.sort());
    });

    it('Should contain the same 4 strings', () => {
      const source = ['asdf', 'sdffd', 'blackmagick'];
      const iterator = shuffle(source);

      expect(toArray(iterator).sort()).to.be.deep.equal(source.sort());
    });

    it('Should contain the same 4 objecs', () => {
      const source = [{ x: 1 }, { x: 10 }, { x: 11 }, { x: 2 }];
      const iterator = shuffle(source);

      expect(toArray(iterator).sort((elem1, elem2) => elem1.x > elem2.x ? 1 : -1))
        .to.be.deep.equal(source.sort((elem1, elem2) => elem1.x > elem2.x ? 1 : -1));
    });
  });
});
