import { expect } from 'chai';
import { concat } from '../../lib/iterators/concat';
import { fromArray } from '../../lib/iterators/fromArray';
import { getIterator } from '../../lib/iterators/getIterator';

describe('iterators/concat', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const left = fromArray([1, 2]);
      const right = fromArray([3, 4, 5]);
      const source = concat(left, right);

      expect(getIterator(source)).not.equals(getIterator(source));
    });
  });

  describe('When left and right are empty', () => {
    it('Should return a completed iterator', () => {
      const left = fromArray([]);
      const right = fromArray([]);
      const result = getIterator(concat(left, right));

      expect(result.next())
        .to.have.property('done')
        .that.is.true;
    });
  });

  describe('When only left is empty', () => {
    it('Should return items from right', () => {
      const left = fromArray([]);
      const right = fromArray([1, 2, 3]);
      const iterator = getIterator(concat(left, right));

      let current = iterator.next();
      expect(current.value).to.equal(1);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.equal(2);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.equal(3);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.be.undefined;
      expect(current.done).to.be.true;
    });
  });

  describe('When only right is empty', () => {
    it('Should return items from left', () => {
      const left = fromArray([1, 2, 3]);
      const right = fromArray([]);
      const iterator = getIterator(concat(left, right));

      let current = iterator.next();
      expect(current.value).to.equal(1);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.equal(2);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.equal(3);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.be.undefined;
      expect(current.done).to.be.true;
    });
  });

  describe('When left and right have elements', () => {
    it('Should iterate over concatenated elements', () => {
      const left = fromArray([1]);
      const right = fromArray([2, 3]);
      const iterator = getIterator(concat(left, right));

      let current = iterator.next();
      expect(current.value).to.equal(1);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.equal(2);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.equal(3);
      expect(current.done).to.be.false;

      current = iterator.next();
      expect(current.value).to.be.undefined;
      expect(current.done).to.be.true;
    });
  });
});
