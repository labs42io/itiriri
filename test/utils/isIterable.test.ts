import { expect } from 'chai';
import { isIterable } from '../../lib/utils/isIterable';
import itiriri from '../../lib';

describe('utils/isIterable', () => {
  describe('When called on array', () => {
    it('Should return true on empty array', () => {
      expect(isIterable([])).to.be.true;
    });
    it('Should return true on non-empty array', () => {
      expect(isIterable([1, 'a'])).to.be.true;
    });
  });
  describe('When called on string', () => {
    it('Should return true on empty string', () => {
      expect(isIterable('')).to.be.true;
    });
    it('Should return true on non-empty string', () => {
      expect(isIterable('asdf')).to.be.true;
    });
  });
  describe('When called on Itiriri', () => {
    it('Should return true', () => {
      expect(isIterable(itiriri([]))).to.be.true;
    });
  });
  describe('When called on Number', () => {
    it('Should return false', () => {
      expect(isIterable(4)).to.be.false;
    });
  });
  describe('When called on Object', () => {
    it('Should return false', () => {
      expect(isIterable({ a: 1, b: 'a' })).to.be.false;
    });
  });
});
