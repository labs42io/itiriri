import { expect } from 'chai';
import { last } from '../../lib/reducers/last';

describe('reducers/last', () => {
  describe('When called on empty array', () => {
    it('Should return undefined', () => {
      const source = [];

      expect(last(source)).to.be.undefined;
    });
  });

  describe('When called on array with one element', () => {
    it('Should return the element', () => {
      const source = [101];

      expect(last(source)).to.be.equal(101);
    });
  });

  describe('When called on array with multiple elements', () => {
    it('Should return the last element (4th)', () => {
      const source = [1, 2, 3, 4];

      expect(last(source)).to.be.equal(4);
    });
  });

  describe('When called on array with multiple elements', () => {
    it('Should return the last element (5th)', () => {
      const source = ['a', 'b', 'c', 'd', 'asdf'];

      expect(last(source)).to.be.equal('asdf');
    });
  });
});
