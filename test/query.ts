import { expect } from 'chai';
import { query } from '../lib/Query';
import { SpyIterable } from './helpers/SpyIterable';
import { numbers as numberGenerator } from './helpers/generators';

describe('Query', () => {
  describe('When calling constructor', () => {
    it('Should return a Query', () => {
      const source = [];
      const q = query(source);

      const methods = [
        'entries', 'keys', 'values', 'forEach', 'concat', 'prepend', 'fill',
        'toArray', 'toMap', 'toGroups', 'toSet', 'toString', 'filter', 'take',
        'skip', 'slice', 'splice', 'join', 'leftJoin', 'rightJoin', 'groupJoin',
        'sort', 'sortDesc', 'shuffle', 'reverse', 'every', 'some', 'includes',
        'distinct', 'exclude', 'intersect', 'union', 'map', 'flat', 'groupBy',
        'at', 'indexOf', 'findIndex', 'lastIndexOf', 'findLastIndex', 'count',
        'first', 'find', 'last', 'findLast', 'average', 'min',
        'max', 'sum', 'reduce', 'reduceRight',
      ];

      methods.forEach((method) => {
        expect(q).to.have.property(method);
      });

    });
    it('Iteration should be deferred', () => {
      const source = new SpyIterable([1, 2]);
      query(source);

      expect(source.wasIterated).to.be.false;
    });
  });

  describe('When calling skip + take', () => {
    it('Should defer both methods', () => {
      const source = new SpyIterable(numberGenerator());
      query(source).skip(100).take(10000);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 4 elemens', () => {
      const source = numberGenerator(1, 2);
      const q = query(source).skip(2).take(4);

      expect(q.toArray()).to.be.deep.equal([5, 7, 9, 11]);
    });

    it('Should return 1 element', () => {
      const source = numberGenerator(1, 2);
      const q = query(source).skip(10).take(1);

      expect(q.at(0)).to.be.equal(21);
    });
  });
});
