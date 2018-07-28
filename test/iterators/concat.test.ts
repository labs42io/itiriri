import { expect } from 'chai';
import { concat } from '../../lib/iterators/concat';
import { iterator } from '../../lib/utils/ierator';

describe('iterators/concat', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', () => {
      const left = [1, 2];
      const right = [3, 4, 5];
      const source = concat(left, right);

      expect(iterator(source)).not.equals(iterator(source));
    });
  });

  describe('When left and right are empty', () => {
    it('Should return a completed iterator', () => {
      const left = [];
      const right = [];
      const result = iterator(concat(left, right));

      expect(result.next())
        .to.have.property('done')
        .that.is.true;
    });
  });

  describe('When only left is empty', () => {
    it('Should return items from right', () => {
      const left = [];
      const right = [1, 2, 3];
      const it = iterator(concat(left, right));

      let current = it.next();
      expect(current.value).to.equal(1);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.equal(2);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.equal(3);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.be.undefined;
      expect(current.done).to.be.true;
    });
  });

  describe('When only right is empty', () => {
    it('Should return items from left', () => {
      const left = [1, 2, 3];
      const right = [];
      const it = iterator(concat(left, right));

      let current = it.next();
      expect(current.value).to.equal(1);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.equal(2);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.equal(3);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.be.undefined;
      expect(current.done).to.be.true;
    });
  });

  describe('When left and right have elements', () => {
    it('Should iterate over concatenated elements', () => {
      const left = [1];
      const right = [2, 3];
      const it = iterator(concat(left, right));

      let current = it.next();
      expect(current.value).to.equal(1);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.equal(2);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.equal(3);
      expect(current.done).to.be.false;

      current = it.next();
      expect(current.value).to.be.undefined;
      expect(current.done).to.be.true;
    });
  });
});
