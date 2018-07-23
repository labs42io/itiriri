import { expect } from 'chai';
import { fromArray } from '../../lib/iterators/fromArray';
import { getIterator } from '../../lib/iterators/getIterator';

describe('iterators/getIterator', () => {
  describe('when called multiple times', () => {
    it.skip('Should return new iterator on each call', () => {
      const source = fromArray([1, 2, 3]);

      const iterator1 = getIterator(source);
      const iterator2 = getIterator(source);

      console.log(iterator1 === iterator2);

      expect(iterator1).not.equals(iterator2);
    });
  });
});
