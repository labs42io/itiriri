import { expect } from 'chai';
import { sort } from '../../lib/iterators/sort';
import { toArray } from '../../lib/reducers/toArray';

describe('iterators/sort', () => {
  describe('When sorting empty source', () => {
    it('Should return empty source', () => {
      const source = [];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When sorting some numbers', () => {
    it('Should return sorted numbers', () => {
      const source = [4, 3, 2, 5, 6, 3, 1, 0];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal([0, 1, 2, 3, 3, 4, 5, 6]);
    });

    it('Should return sorted numbers', () => {
      const source = [4, 3, 2, 5, 6, -3, -1, 0];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal([-3, -1, 0, 2, 3, 4, 5, 6]);
    });

    it('Should return sorted numbers', () => {
      const source = [3];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal([3]);
    });

    it('Should return sorted numbers', () => {
      const source = [1, -1];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal([-1, 1]);
    });
  });

  describe('When sorting strings', () => {
    it('Should return them in lexicographic order', () => {
      const source = ['ab', 'aa', 'cc', 'abc'];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal(['aa', 'ab', 'abc', 'cc']);
    });

    it('Should return them in lexicographic order', () => {
      const source = ['fb', 'aa', 'cc', 'abc'];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal(['aa', 'abc', 'cc', 'fb']);
    });
  });

  describe('When sorting floats', () => {
    it('Should return them ordered', () => {
      const source = [0.3, 0.4, 0.1, 0.002];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal([0.002, 0.1, 0.3, 0.4]);
    });
    it('Should return them ordered', () => {
      const source = [0.3, 0.4, 0.001, 0.002];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal([0.001, 0.002, 0.3, 0.4]);
    });
    it('Should return them ordered', () => {
      const source = [10.3, 5.4];
      const iterator = sort(source, (elem, idx) => elem);

      expect(toArray(iterator)).to.deep.equal([5.4, 10.3]);
    });
  });

  describe('When sorting numbers descending', () => {
    it('Should return them orderd descending', () => {
      const source = [4, 3, 1, 23, 4, -1];
      const iterator = sort(source, (elem, idx) => elem, true);

      expect(toArray(iterator)).to.deep.equal([23, 4, 4, 3, 1, -1]);
    });
    it('Should return them orderd descending', () => {
      const source = [0, 1, 3, -1, -5, 100];
      const iterator = sort(source, (elem, idx) => elem, true);

      expect(toArray(iterator)).to.deep.equal([100, 3, 1, 0, -1, -5]);
    });
    it('Should return them orderd descending', () => {
      const source = [0, 1, 3, 4];
      const iterator = sort(source, (elem, idx) => elem, true);

      expect(toArray(iterator)).to.deep.equal([4, 3, 1, 0]);
    });
  });

  describe('When sorting strings descending', () => {
    it('Should return them orderd descending (lexicographic)', () => {
      const source = ['a', 'ab', 'ccd', 'xzv'];
      const iterator = sort(source, (elem, idx) => elem, true);

      expect(toArray(iterator)).to.deep.equal(['xzv', 'ccd', 'ab', 'a']);
    });
    it('Should return them orderd descending (lexicographic)', () => {
      const source = ['abc', 'ac', 'a'];
      const iterator = sort(source, (elem, idx) => elem, true);

      expect(toArray(iterator)).to.deep.equal(['ac', 'abc', 'a']);
    });
  });

  describe('When sorting floats descending', () => {
    it('Should return them orderd descending', () => {
      const source = [0.1, 0.2, 0.134, 3.14];
      const iterator = sort(source, (elem, idx) => elem, true);

      expect(toArray(iterator)).to.deep.equal([3.14, 0.2, 0.134, 0.1]);
    });
    it('Should return them orderd descending', () => {
      const source = [1.1, 100.0];
      const iterator = sort(source, (elem, idx) => elem, true);

      expect(toArray(iterator)).to.deep.equal([100.0, 1.1]);
    });
  });

  describe('When sorting objects by property (string)', () => {
    it('Should return them ordered (lexicographic)', () => {
      const source = [{ name: 'Valera' }, { name: 'Jora' }, { name: 'Ghitza' }];
      const iterator = sort(source, (elem, idx) => elem.name);

      expect(toArray(iterator)).to.be.deep.equal(
        [{ name: 'Ghitza' }, { name: 'Jora' }, { name: 'Valera' }],
      );
    });
  });

  describe('When sorting objects by property (string) descending', () => {
    it('Should return them ordered (lexicographic) descending', () => {
      const source = [{ name: 'Valera' }, { name: 'Jora' }, { name: 'Ghitza' }];
      const iterator = sort(source, (elem, idx) => elem.name, true);

      expect(toArray(iterator)).to.be.deep.equal(
        [{ name: 'Valera' }, { name: 'Jora' }, { name: 'Ghitza' }],
      );
    });
  });

  describe('When sorting objects by property (float)', () => {
    it('Should return them orderd', () => {
      const source = [{ price: 10.11 }, { price: 100.99 }, { price: 3.14 }];
      const iterator = sort(source, (elem, idx) => elem.price);

      expect(toArray(iterator)).to.be.deep.equal(
        [{ price: 3.14 }, { price: 10.11 }, { price: 100.99 }],
      );
    });
  });

  describe('When sorting objects that have same key', () => {
    it('Should preserve the order of the original equal objects', () => {
      const source = [
        { power: 100, name: 'Superman' },
        { power: 100, name: 'Batman' },
        { power: -99, name: 'Deadpool' },
      ];
      const iterator = sort(source, (elem, idx) => elem.power);

      expect(toArray(iterator)).to.be.deep.equal([
        { power: -99, name: 'Deadpool' },
        { power: 100, name: 'Superman' },
        { power: 100, name: 'Batman' },
      ]);
    });
  });

  describe('When using index as sorting criteria', () => {
    it('Should preserve the order', () => {
      const source = [{ tag: 'selfie' }, { tag: 'phone' }];
      const iterator = sort(source, (elem, idx) => idx);

      expect(toArray(iterator)).to.be.deep.equal([
        { tag: 'selfie' },
        { tag: 'phone' },
      ]);
    });

    it('Should reverse the order', () => {
      const source = [4, 5, 1, 2, 3];
      const iterator = sort(source, (elem, idx) => -idx);

      expect(toArray(iterator)).to.be.deep.equal([3, 2, 1, 5, 4]);
    });

    it('Should put even index elements first', () => {
      const source = ['a', 'b', 'c', 'd'];
      const iterator = sort(source, (elem, idx) => idx % 2);

      expect(toArray(iterator)).to.be.deep.equal(['a', 'c', 'b', 'd']);
    });
  });
});
