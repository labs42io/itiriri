import { expect } from 'chai';
import { max } from '../../lib/reducers/max';

describe('reducers/max', () => {
  describe('When called on empty array', () => {
    it('Should return undefined', () => {
      const source = [];

      expect(max(source)).to.be.undefined;
    });
  });

  describe('When calle on some array', () => {
    it('Should return 3', () => {
      const source = [-1, 0, 1, 3];

      expect(max(source)).to.be.equal(3);
    });

    it('Should return -2', () => {
      const source = [-10, -2, -11, -13, -664];

      expect(max(source)).to.be.equal(-2);
    });

    it('Should return 10.99', () => {
      const source = [0.1, 9.9, 10.99, 10.1];
      expect(max(source)).to.be.equal(10.99);
    });
  });
});
