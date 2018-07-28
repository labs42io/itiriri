import { expect } from 'chai';
import { toArray } from '../../lib/reducers/toArray';

describe('reducers/toArray', () => {
  describe('When called on empty source', () => {
    it('Should return empty source', () => {
      const source = [];

      expect(toArray(source)).to.be.deep.equal([]);
    });
  });

  describe('When called on some source', () => {
    it('Should return a copy', () => {
      const source = [1, 2, 3];

      expect(toArray(source)).to.not.equal(source);
    });

    it('Should return array of 3 elements', () => {
      const source = [1, 2, 3];

      expect(toArray(source)).to.be.deep.equal([1, 2, 3]);
    });

    it('Should return array of 4 elements', () => {
      const source = 'asdf';

      expect(toArray(source)).to.be.deep.equal(['a', 's', 'd', 'f']);
    });

    it('Should return array of 5 elements', () => {
      const source = new Set([5, 4, 3, 2, 1]);

      expect(toArray(source)).to.be.deep.equal([5, 4, 3, 2, 1]);
    });

    it('Should return array from a generator', () => {
      const source = function* () {
        yield 1;
        yield 2;
        yield 3;
      };

      expect(toArray(source())).to.be.deep.equal([1, 2, 3]);
    });
  });
});
