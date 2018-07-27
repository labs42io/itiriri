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
    it('Should return the first element', () => {
      const source = [-1, 10, 17, 3];

      expect(min(source)).to.be.equal(-1);
    });

    it('Should return the last element', () => {
      const source = [-10, -2, -11, -13, -664];

      expect(min(source)).to.be.equal(-664);
    });

    it('Should return the middle element', () => {
      const source = [0.1, 9.9, -10.99, 10.1];

      expect(min(source)).to.be.equal(-10.99);
    });
  });
});
