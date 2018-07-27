import { expect } from 'chai';
import { except } from '../../lib/iterators/except';
import { toArray } from '../../lib/reducers/toArray';
import { getIterator } from '../../lib/utils/getIterator';

describe('iterators/except', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const left = [1, 2];
      const right = [3, 4, 5];

      expect(except(left, right, x => x)).not.equals(except(left, right, x => x));
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', () => {
      const left = [];
      const right = [];
      const iterator = getIterator(except(left, right, x => x));

      expect(iterator.next()).to.have.property('done').that.is.true;
    });

    it('Should return completed iterator for non-empty exclusions', () => {
      const left = [];
      const right = [1, 2, 3];
      const iterator = getIterator(except(left, right, x => x));

      expect(iterator.next()).to.have.property('done').that.is.true;
    });
  });

  describe('When source has elemements', () => {
    describe('And exclusion is empty', () => {
      it('Should return elements from source', () => {
        const left = [1, 2, 3];
        const right = [];
        const iterator = except(left, right, x => x);
        const result = toArray(iterator);

        expect(result).to.deep.equal([1, 2, 3]);
      });
    });

    describe('And is disjoint with exclusion', () => {
      it('Should return elements from source', () => {
        const left = [1, 2, 3];
        const right = [4, 5];
        const iterator = except(left, right, x => x);
        const result = toArray(iterator);

        expect(result).to.deep.equal([1, 2, 3]);
      });
    });

    describe('And source has same elements', () => {
      it('Should return empty iterator', () => {
        const left = [1, 2, 3];
        const right = [1, 2, 3];
        const iterator = getIterator(except(left, right, x => x));

        expect(iterator.next()).to.have.property('done').that.is.true;
      });
    });

    describe('And source has some elements in common', () => {
      it('Should return correct result', () => {
        const left = [1, 2, 3];
        const right = [2, 3, 4];
        const iterator = except(left, right, x => x);
        const result = toArray(iterator);

        expect(result).to.deep.equal([1]);
      });
    });

    describe('And source has some elements in common', () => {
      it('Should return correct result for a key selector', () => {
        const elem1 = { p: 1 };
        const elem2 = { p: 2 };
        const elem3 = { p: 3 };
        const elem4 = { p: 4 };
        const left = [elem1, elem2, elem3, { p: 1 }];
        const right = [{ p: 2 }, elem3, elem4];
        const iterator = except(left, right, x => x.p);
        const result = toArray(iterator);

        expect(result).to.deep.equal([elem1]);
      });
    });

    describe('And source has some duplicate elements in common', () => {
      it('Should return correct result', () => {
        const left = [1, 1, 2, 3, 3];
        const right = [2, 2, 3, 3, 4];
        const iterator = except(left, right, x => x);
        const result = toArray(iterator);

        expect(result).to.deep.equal([1]);
      });
    });
  });
});
