import { expect } from 'chai';
import { fromArray } from '../../lib/iterators/fromArray';
import { getIterator } from '../../lib/iterators/getIterator';

describe('iterators/getIterator', () => {
  describe('When called on any array', () => {
    it('Should return an iterator', () => {
      const source = [];
      const iterator = fromArray(source);

      expect(iterator).to.not.be.undefined;
    });
    it('Should return an iterator', () => {
      const source = [1, 2, 4, 8, 16];
      const iterator = fromArray(source);

      expect(iterator).to.not.be.undefined;
    });
  });

  describe('When called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const source = [1, 2, 3];
      const iterator = fromArray(source);

      const iterator1 = getIterator(iterator);
      const iterator2 = getIterator(iterator);

      expect(iterator1).not.equals(iterator2);
    });
  });
});
