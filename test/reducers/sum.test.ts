import { expect } from 'chai';
import { sum } from '../../lib/reducers/sum';

describe('reducers/sum', () => {
  describe('When called on empty array', () => {
    it('Should return undefined', () => {
      const source = [];

      expect(sum(source)).to.be.undefined;
    });
  });

  describe('When calle on some array', () => {
    it('Should return 3', () => {
      const source = [-1, 0, 1, 3];

      expect(sum(source)).to.be.equal(3);
    });

    it('Should return -40', () => {
      const source = [-10, -2, -11, -17];

      expect(sum(source)).to.be.equal(-40);
    });

    it('Should return 100.5', () => {
      const source = [10.1, 15.1, 15.1, 50.1, 10.1];
      expect(sum(source)).to.be.equal(100.5);
    });
  });
});
