import { expect } from 'chai';
import { shuffle } from '../../lib/iterators/shuffle';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/shuffle', () => {
  describe('When shuffle an array', () => {
    it('Should have the same elements', () => {
      const source = [3, 4, 3, 1, 5];
      const iterator = shuffle(source);

      expect(source.length).to.be.equal(toArray(iterator).length);

      toArray(iterator).forEach((element) => {
        expect(source).to.include(element);
      });
    });

    it('Should have the same elements', () => {
      const source = [3, 4, 3];
      const iterator = shuffle(source);

      expect(source.length).to.be.equal(toArray(iterator).length);

      toArray(iterator).forEach((element) => {
        expect(source).to.include(element);
      });
    });

    it('Should have the same elements', () => {
      const source = [1, 1, 1, 13, 4, 0, 6, 6, 5, 4, 3, 4, 3];
      const iterator = shuffle(source);

      expect(source.length).to.be.equal(toArray(iterator).length);

      toArray(iterator).forEach((element) => {
        expect(source).to.include(element);
      });
    });
  });
});
