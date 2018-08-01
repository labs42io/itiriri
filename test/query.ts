import { expect } from 'chai';
import { query } from '../lib/Query';
import { SpyIterable } from './helpers/SpyIterable';

describe('Query', () => {
  describe('When calling constructor', () => {
    it('Should return a Query', () => {
      const source = new SpyIterable([]);
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

      expect(source.wasIterated).to.be.false;
    });
  });
});
