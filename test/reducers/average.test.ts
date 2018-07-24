import { expect } from 'chai';
import { average } from '../../lib/reducers/average';

describe('reducers/average', () => {
  describe('When calling on some array', () => {
    it('Should return the average', () => {
      const source = [0, 2, 2, 4];

      expect(average(source)).to.be.deep.equal(2);
    });
    it('Should return the average', () => {
      const source = [0];

      expect(average(source)).to.be.deep.equal(0);
    });
    it('Should return the average', () => {
      const source = [0, -2];

      expect(average(source)).to.be.deep.equal(-1);
    });
  });
});
