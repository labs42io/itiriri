import { expect } from 'chai';
import { fromArray } from '../../lib/iterators/fromArray';
import { getIterator } from '../../lib/iterators/getIterator';

describe('iterators/getIterator', () => {
  describe('When called on empty array', () => {
    it('Should return an iterator', () => {
      const source = [];
      const iterator = getIterator(fromArray(source));

      expect(iterator).to.have.property('next');
    });

    it('Should return completed iterator', () => {
      const source = [];
      const iterator = getIterator(fromArray(source));

      expect(iterator.next()).to.have.property('done').that.is.true;
    });

    it('Should return undefined next value', () => {
      const source = [];
      const iterator = getIterator(fromArray(source));

      expect(iterator.next()).to.have.property('value').that.is.undefined;
    });
  });

  describe('When called on array with one element', () => {
    it('Should iterate through element', () => {
      const source = [11];
      const iterator = getIterator(fromArray(source));

      let current = iterator.next();
      expect(current).to.have.property('value').that.is.equal(11);
      expect(current).to.have.property('done').that.is.false;

      current = iterator.next();
      expect(current).to.have.property('value').that.is.undefined;
      expect(current).to.have.property('done').that.is.true;
    });
  });

  describe('When called on array with multiple elements', () => {
    it('Should iterate through elements', () => {
      const source = [4, 5, 10];
      const iterator = getIterator(fromArray(source));

      let current = iterator.next();
      expect(current).to.have.property('value').that.is.equal(4);
      expect(current).to.have.property('done').that.is.false;

      current = iterator.next();
      expect(current).to.have.property('value').that.is.equal(5);
      expect(current).to.have.property('done').that.is.false;

      current = iterator.next();
      expect(current).to.have.property('value').that.is.equal(10);
      expect(current).to.have.property('done').that.is.false;

      current = iterator.next();
      expect(current).to.have.property('value').that.is.undefined;
      expect(current).to.have.property('done').that.is.true;
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
