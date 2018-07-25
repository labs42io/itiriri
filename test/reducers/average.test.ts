import { expect } from 'chai';
import { average } from '../../lib/reducers/average';
import { toArray } from '../../lib/reducers/toArray';

describe('reducers/average', () => {
  describe('When calling on some integer array', () => {
    it('Should return the average of 4 elements', () => {
      const source = [0, 2, 2, 4];

      expect(average(source)).to.be.equal(2);
    });

    it('Should return the average of 1 element', () => {
      const source = [0];

      expect(average(source)).to.be.equal(0);
    });

    it('Should return the average of 2 elements', () => {
      const source = [0, -2];

      expect(average(source)).to.be.equal(-1);
    });

    it('Should return the average of 5 elements', () => {
      const source = [11.1, 2.2, 6.7, 14.5, 15.5];

      expect(average(source)).to.be.equal(10.0);
    });
  });

  describe('When calling on empty source', () => {
    it('Should return undefined', () => {
      const source = [];

      expect(average(source)).to.be.undefined;
    });
  });
});
