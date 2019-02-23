import { expect } from 'chai';
import { numbers as numberGenerator } from '../helpers/generators';
import { SpyIterable } from '../helpers/SpyIterable';
import itiriri from '../../lib';

describe('Itiriri (itiriri)', () => {
  describe('When calling entries', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).entries();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 4 key/value pairs', () => {
      const source = numberGenerator(0, 2);
      const q = itiriri(source).take(4).entries();

      expect(q.toArray()).to.be.deep.equal([[0, 0], [1, 2], [2, 4], [3, 6]]);
    });
  });

  describe('When calling keys', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).keys();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return the keys', () => {
      const source = numberGenerator();
      const q = itiriri(source).take(10).keys();

      expect(q.toArray()).to.be.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('When calling values', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).values();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return a new query with same values', () => {
      const source = [1, 3, 4, 2, 2];
      const q1 = itiriri(source);
      const q2 = q1.values();

      expect(q2).to.not.be.equal(q1);
      expect(q2.toArray()).to.be.deep.equal(q1.toArray());
    });
  });

  describe('When calling concat', () => {
    it('Should be a deferred method', () => {
      const source1 = new SpyIterable(numberGenerator());
      const source2 = new SpyIterable(numberGenerator());
      itiriri(source1).take(10).concat(itiriri(source2).take(5));

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return 10 elements', () => {
      const source1 = numberGenerator(0, 2);
      const source2 = numberGenerator();
      const q1 = itiriri(source1);
      const q2 = itiriri(source2).take(5).concat(q1.take(5));

      expect(q2.toArray()).to.be.deep.equal([0, 1, 2, 3, 4, 0, 2, 4, 6, 8]);
    });

    it('Should return 2 elements', () => {
      const source = numberGenerator(0, 2);
      const q = itiriri(source).take(1).concat(5);

      expect(q.toArray()).to.be.deep.equal([0, 5]);
    });
  });

  describe('When calling prepend', () => {
    it('Should be a deferred method', () => {
      const source1 = new SpyIterable([1, 2, 3]);
      const source2 = new SpyIterable([]);
      itiriri(source1).prepend(source2);

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return 6 elemnts', () => {
      const source1 = numberGenerator(0, 10);
      const source2 = numberGenerator(100, 100);
      const q1 = itiriri(source1).skip(2).take(3);
      const q2 = itiriri(source2).prepend(q1.toArray()).take(6);

      expect(q2.toArray()).to.be.deep.equal([20, 30, 40, 100, 200, 300]);
    });

    it('Should return 2 elements', () => {
      const source = [1];
      const q = itiriri(source).prepend(2);

      expect(q.toArray()).to.be.deep.equal([2, 1]);
    });
  });

  describe('When calling fill with positive indexes', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable([1, 2, 3]);
      itiriri(source).fill(0, 1);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 5 elements', () => {
      const source = numberGenerator();
      const q = itiriri(source).fill(10, 1, 3).take(5);

      expect(q.toArray()).to.be.deep.equal([0, 10, 10, 3, 4]);
    });

    it('Should return 4 elements', () => {
      const source = numberGenerator();
      const q = itiriri(source).fill(11, 1, 1).take(4);

      expect(q.toArray()).to.be.deep.equal([0, 1, 2, 3]);
    });

    it('Should return same elements', () => {
      const source = numberGenerator();
      const q = itiriri(source).fill(100, 4, 1).take(10);

      expect(q.toArray()).to.be.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('Should return 10 elements', () => {
      const source = numberGenerator();
      const q = itiriri(source).fill(10, 2).take(10);

      expect(q.toArray()).to.be.deep.equal([0, 1, 10, 10, 10, 10, 10, 10, 10, 10]);
    });

    it('Should return 4 elements', () => {
      const source = [1, -2, 3, -4];
      const q = itiriri(source).fill(0);

      expect(q.toArray()).to.be.deep.equal([0, 0, 0, 0]);
    });
  });

  describe.skip('When calling fill with negative indexes', () => {
    it('Should return 5 elements', () => {
      const source = numberGenerator();
      const q = itiriri(source).take(5).fill(10, -3, -1);

      expect(q.toArray()).to.be.deep.equal([0, 1, 10, 10, 4]);
    });

    it('Should return 4 elements', () => {
      const source = numberGenerator();
      const q = itiriri(source).take(4).fill(11, -1, -1);

      expect(q.toArray()).to.be.deep.equal([0, 1, 2, 3]);
    });

    it('Should return same elements', () => {
      const source = numberGenerator();
      const q = itiriri(source).take(10).fill(100, -1, -4);

      expect(q.toArray()).to.be.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('Should return 4 elements', () => {
      const source = [-1, 2, -3, 4];
      const q = itiriri(source).fill(0, -2);

      expect(q.toArray()).to.be.deep.equal([-1, 2, 0, 0]);
    });
  });

  describe.skip('When calling fill with mixed indexes', () => {
    it('Should return 5 elements', () => {
      const source = [4, 5, 1, 2, 3];
      const q = itiriri(source).fill(0, 1, -1);

      expect(q.toArray()).to.be.deep.equal([4, 0, 0, 2, 3]);
    });

    it('Should return 4 elements', () => {
      const source = [4, 1, 2, 3];
      const q = itiriri(source).fill(0, -2, 3);

      expect(q.toArray()).to.be.deep.equal([4, 1, 0, 3]);
    });

    it('Should return 6 elements', () => {
      const source = [4, 1, 5, 1, 2, 3];
      const q = itiriri(source).fill(0, 4, -4);

      expect(q.toArray()).to.be.deep.equal([4, 1, 5, 1, 2, 3]);
    });
  });
});
