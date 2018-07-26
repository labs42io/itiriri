import { expect } from 'chai';
import { min } from '../../lib/reducers/min';

describe('reducers/min', () => {
  describe('When called on empty array', () => {
    it('Should return undefined', () => {
      const source = [];

      expect(min(source)).to.be.undefined;
    });
  });

  describe('When calle on some array', () => {
    it('Should return -1', () => {
      const source = [-1, 10, 17, 3];

      expect(min(source)).to.be.equal(-1);
    });

    it('Should return -664', () => {
      const source = [-10, -2, -11, -13, -664];

      expect(min(source)).to.be.equal(-664);
    });

    it('Should return -10.99', () => {
      const source = [0.1, 9.9, -10.99, 10.1];

      expect(min(source)).to.be.equal(-10.99);
    });
  });
});
