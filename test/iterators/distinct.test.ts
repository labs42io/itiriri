import { expect } from 'chai';
import { distinct } from '../../lib/iterators/distinct';
import { toArray } from '../../lib/reducers/toArray';
import { iterator } from '../../lib/utils/ierator';

describe('iterators/distinct', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const source = [1, 2, 3];
      const result = distinct(source, x => x);

      expect(iterator(result)).not.equals(iterator(result));
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', () => {
      const source = [];
      const iterator = distinct(source, x => x);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When source has unique elements', () => {
    it('Should return the elements', () => {
      const arr = [1, 2, 3];
      const iterator = distinct(arr, x => x);
      const result = toArray(iterator);

      expect(result).to.deep.equal(arr);
    });
  });

  describe('When source has unique element keys', () => {
    it('Should return the elements', () => {
      const arr = [{ p: 1 }, { p: 2 }, { p: 3 }];
      const iterator = distinct(arr, x => x.p);
      const result = toArray(iterator);

      expect(result).to.deep.equal(arr);
    });
  });

  describe('When source has all elements same', () => {
    it('Should return the unique element', () => {
      const arr = [42, 42, 42];
      const iterator = distinct(arr, x => x);
      const result = toArray(iterator);

      expect(result).to.deep.equal([42]);
    });
  });

  describe('When source has duplicate elements', () => {
    it('Should return unique elements', () => {
      const arr = [1, 42, 2, 42, 42];
      const iterator = distinct(arr, x => x);
      const result = toArray(iterator);

      expect(result).to.deep.equal([1, 42, 2]);
    });
  });

  describe('When source has all element keys same', () => {
    it('Should return the unique element', () => {
      const elem = { p: 42 };
      const arr = [elem, elem, elem];
      const iterator = distinct(arr, x => x.p);
      const result = toArray(iterator);

      expect(result).to.deep.equal([elem]);
    });
  });

  describe('When source has duplicate element keys', () => {
    it('Should return unique elements by their first occurence', () => {
      const elem1 = { p: 1 };
      const elem42 = { p: 42 };
      const elem2 = { p: 2 };
      const arr = [elem1, elem42, elem2, { p: 42 }, { p: 42 }];
      const iterator = distinct(arr, x => x.p);
      const result = toArray(iterator);

      expect(result).to.deep.equal([elem1, elem42, elem2]);
    });
  });
});
