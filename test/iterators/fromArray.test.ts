import { expect } from 'chai';
import { fromArray } from '../../lib/iterators/fromArray';
import { getIterator } from '../../lib/iterators/getIterator';

describe('iterators/fromArray', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const source = [1, 2, 3];
      expect(fromArray(source)).not.equals(fromArray(source));
    });
  });

  describe('When array is empty', () => {
    it('Should return completed iterator', () => {
      const iterator = fromArray([]);
      expect(getIterator(iterator).next())
        .to.have.property('done')
        .that.is.true;
    });

    it('Should return undefined value', () => {
      const iterator = fromArray([]);
      expect(getIterator(iterator).next())
        .to.have.property('value')
        .that.is.undefined;
    });
  });

  describe('When array has one element', () => {
    it('Should iterate through element', () => {
      const iterator = fromArray([42]);
      expect(getIterator(iterator).next())
        .to.have.property('value')
        .that.equals(42);
    });

    it('Should iterate only once', () => {
      const iterator = getIterator(fromArray([42]));
      iterator.next();

      expect(iterator.next())
        .to.have.property('done')
        .that.is.true;
    });
  });

  describe('When array has multiple elements', () => {
    it('Should iterate over all elements', () => {
      const iterator = getIterator(fromArray([41, 42, 43]));

      let current = iterator.next();
      expect(current.value).to.equal(41);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.equal(42);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.equal(43);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.be.undefined;
      expect(current.done).to.be.true;
    });
  });
});
