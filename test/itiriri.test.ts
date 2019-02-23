import { expect } from 'chai';
import itiriri from '../lib';
import { SpyIterable } from './helpers/SpyIterable';
import { numbers as numberGenerator } from './helpers/generators';
import { toArray } from '../lib/reducers/toArray';

describe('Itiriri', () => {
  describe('When calling constructor', () => {
    it('Should return an Itiriri', () => {
      const source = [];
      const q = itiriri(source);

      const methods = [
        'entries', 'keys', 'values', 'forEach', 'concat', 'prepend', 'fill',
        'toArray', 'toMap', 'toGroups', 'toSet', 'toString', 'filter', 'take',
        'skip', 'slice', 'splice', 'join', 'leftJoin', 'rightJoin', 'groupJoin',
        'sort', 'shuffle', 'reverse', 'every', 'some', 'includes',
        'distinct', 'exclude', 'intersect', 'union', 'map', 'flat', 'groupBy',
        'nth', 'indexOf', 'findIndex', 'lastIndexOf', 'findLastIndex', 'length',
        'first', 'find', 'last', 'findLast', 'average', 'min',
        'max', 'sum', 'reduce', 'reduceRight',
      ];

      methods.forEach((method) => {
        expect(q).to.have.property(method);
      });

    });
    it('Iteration should be deferred', () => {
      const source = new SpyIterable([1, 2]);
      itiriri(source);

      expect(source.wasIterated).to.be.false;
    });
  });

  describe('When calling skip + take', () => {
    it('Should return 4 elemens', () => {
      const source = numberGenerator(1, 2);
      const q = itiriri(source).skip(2).take(4);

      expect(q.toArray()).to.be.deep.equal([5, 7, 9, 11]);
    });

    it('Should return 1 element', () => {
      const source = numberGenerator(1, 2);
      const q = itiriri(source).skip(10).take(1);

      expect(q.nth(0)).to.be.equal(21);
    });
  });

  describe('When calling take + sort', () => {
    it('Should return 5 elements', () => {
      const source = numberGenerator(10, -1);
      const q = itiriri(source).take(5).sort();

      expect(toArray(q)).to.be.deep.equal([6, 7, 8, 9, 10]);
    });
  });
});
