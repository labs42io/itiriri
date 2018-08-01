import { expect } from 'chai';
import { numberGenerator } from '../helpers/generators';
import { SpyIterable } from '../helpers/SpyIterable';
import { query } from '../../lib/Query';

describe('Query (value)', () => {
  describe('When calling at with positive index', () => {
    it('Should return first element', () => {
      const source = new SpyIterable(numberGenerator());
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.at(3)).to.be.equal(3);
    });
  });

  describe('When calling at with negative index', () => {
    it('Should return last element', () => {
      const source = new SpyIterable(numberGenerator());
      const q = query(source).take(100);

      expect(source.wasIterated).to.be.false;
      expect(q.at(-1)).to.be.equal(99);
    });
  });

  describe('When calling indexOf', () => {
    it('Should return first element index', () => {
      const source = new SpyIterable(numberGenerator(0, 3));
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.indexOf(0)).to.be.equal(0);
    });
    it('Should return 5th element index', () => {
      const source = new SpyIterable(numberGenerator(0, 3));
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.indexOf(12)).to.be.equal(4);
    });
  });

  describe('When calling lastIndexOf', () => {
    it('Should return first element index', () => {
      const source = new SpyIterable([1, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.lastIndexOf(1)).to.be.equal(0);
    });
    it('Should return last element index', () => {
      const source = new SpyIterable([1, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.lastIndexOf(4)).to.be.equal(5);
    });
    it('Should return 5th element index', () => {
      const source = new SpyIterable([0, 1, 0, 0, 0, 2, 2, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.lastIndexOf(0)).to.be.equal(4);
    });
  });

  describe('When calling findIndex', () => {
    it('Should return first element index', () => {
      const source = new SpyIterable([1, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findIndex(x => x === 1)).to.be.equal(0);
    });
    it('Should return last element index', () => {
      const source = new SpyIterable([0, 1, 1, 1, 2, 44]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findIndex(x => x - 10 > 30)).to.be.equal(5);
    });
    it('Should return 5th element index', () => {
      const source = new SpyIterable([0, 1, 0, 0, -1, 2, 2, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findIndex(x => x < 0)).to.be.equal(4);
    });
    it('Should return -1', () => {
      const source = new SpyIterable([0, 1, 0, 0, 1, 2, 2, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findIndex(x => x < 0)).to.be.equal(-1);
    });
  });

  describe('When calling findLastIndex', () => {
    it('Should return first element index', () => {
      const source = new SpyIterable([1, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findLastIndex(x => x === 1)).to.be.equal(0);
    });
    it('Should return last element index', () => {
      const source = new SpyIterable([100, 1, 1, 1, 2, 44]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findLastIndex(x => x - 10 > 30)).to.be.equal(5);
    });
    it('Should return 5th element index', () => {
      const source = new SpyIterable([0, 1, 0, 0, -1, 2, 2, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findLastIndex(x => x < 0)).to.be.equal(4);
    });
    it('Should return -1', () => {
      const source = new SpyIterable([0, 1, 0, 0, 1, 2, 2, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findLastIndex(x => x < 0)).to.be.equal(-1);
    });
  });

  describe('When calling count', () => {
    it('Should return 6', () => {
      const source = new SpyIterable([1, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.count()).to.be.equal(6);
    });
    it('Should return 1', () => {
      const source = new SpyIterable([1, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.count(x => x > 10)).to.be.equal(1);
    });
    it('Should return 3', () => {
      const source = new SpyIterable([1, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.count((elem, idx) => idx > 2)).to.be.equal(3);
    });
  });

  describe('When calling first', () => {
    it('Should return 6', () => {
      const source = new SpyIterable([6, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.first()).to.be.equal(6);
    });
    it('Should return undefined', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.first()).to.be.undefined;
    });
    it('Should return 3', () => {
      const source = new SpyIterable(numberGenerator(3, 0));
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.first()).to.be.equal(3);
    });
  });

  describe('When calling find', () => {
    it('Should return 33', () => {
      const source = new SpyIterable([6, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.find(x => x > 30)).to.be.equal(33);
    });
    it('Should return undefined', () => {
      const source = new SpyIterable([1, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.find((elem, idx) => elem + idx === 0)).to.be.undefined;
    });
    it('Should return first element', () => {
      const source = new SpyIterable(numberGenerator(3, 3));
      const q = query(source).take(10);

      expect(source.wasIterated).to.be.false;
      expect(q.find(x => x === 3)).to.be.equal(3);
    });
    it('Should return 33', () => {
      const source = new SpyIterable(numberGenerator(3, 3));
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.find((elem, idx) => idx === 10)).to.be.equal(33);
    });
  });

  describe('When calling last', () => {
    it('Should return 4', () => {
      const source = new SpyIterable([6, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.last()).to.be.equal(4);
    });
    it('Should return undefined', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.last()).to.be.undefined;
    });
  });

  describe('When calling findLast', () => {
    it('Should return 33', () => {
      const source = new SpyIterable([6, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findLast(x => x > 30)).to.be.equal(33);
    });
    it('Should return undefined', () => {
      const source = new SpyIterable([1, 2]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.findLast((elem, idx) => elem + idx === 0)).to.be.undefined;
    });
    it('Should return first element', () => {
      const source = new SpyIterable([3, 4, 5, 5]);
      const q = query(source).take(10);

      expect(source.wasIterated).to.be.false;
      expect(q.findLast(x => x === 3)).to.be.equal(3);
    });
  });

  describe('When calling average', () => {
    it('Should return 33', () => {
      const source = new SpyIterable([66, 0, 33]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.average()).to.be.equal(33);
    });
    it('Should return undefined', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.average()).to.be.undefined;
    });
    it('Should return 10', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: 0, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.average(x => x.val)).to.be.equal(10);
    });
  });

  describe('When calling min', () => {
    it('Should return -1', () => {
      const source = new SpyIterable([-1, 3, 4, 33, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.min()).to.be.equal(-1);
    });
    it('Should return undefined', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.min()).to.be.undefined;
    });
    it('Should return first element', () => {
      const source = new SpyIterable([
        { val: -10, tag: 'a' }, { val: 20, tag: 'b' }, { val: 0, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.min(x => x.val)).to.be.equal(-10);
    });
  });

  describe('When calling max', () => {
    it('Should return 30', () => {
      const source = new SpyIterable([-1, 3, 4, 30, 2, 4]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.max()).to.be.equal(30);
    });
    it('Should return undefined', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.max()).to.be.undefined;
    });
    it('Should return first element', () => {
      const source = new SpyIterable([
        { val: 1010, tag: 'a' }, { val: 20, tag: 'b' }, { val: 0, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.max(x => x.val)).to.be.equal(1010);
    });
  });

  describe('When calling sum', () => {
    it('Should return 30', () => {
      const source = new SpyIterable([0, -4, 4, 30, 10, -10]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.sum()).to.be.equal(30);
    });
    it('Should return undefined', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.sum()).to.be.undefined;
    });
    it('Should return 20', () => {
      const source = new SpyIterable([
        { val: 0, tag: 'a' }, { val: 20, tag: 'b' }, { val: 0, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.max(x => x.val)).to.be.equal(20);
    });
  });

  describe('When calling reduce', () => {
    it('Should return 0', () => {
      const source = new SpyIterable([0, -4, 4, 30, 10, -10]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.reduce(() => 0, 0)).to.be.equal(0);
    });
    it('Should throw exception', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(() => q.reduce(() => 0)).to.throw(Error, 'Sequence contains no elements.');
    });
    it('Should return 20', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: -10, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.reduce((x, e, idx) => x + e.val, 0)).to.be.equal(20);
    });
    it('Should return abc', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: -10, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.reduce((x, e, idx) => x + e.tag, '')).to.be.equal('abc');
    });
  });

  describe('When calling reduceRight', () => {
    it('Should return 0', () => {
      const source = new SpyIterable([0, -4, 4, 30, 10, -10]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.reduceRight(() => 0, 0)).to.be.equal(0);
    });
    it('Should throw exception', () => {
      const source = new SpyIterable([]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(() => q.reduceRight(() => 0)).to.throw(Error, 'Sequence contains no elements.');
    });
    it('Should return 20', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: -10, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.reduceRight((x, e, idx) => x + e.val, 0)).to.be.equal(20);
    });
    it('Should return cba', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: -10, tag: 'c' },
      ]);
      const q = query(source);

      expect(source.wasIterated).to.be.false;
      expect(q.reduceRight((x, e, idx) => x + e.tag, '')).to.be.equal('cba');
    });
  });

  describe('When calling forEach', () => {
    it('Should return 4 transfromed elements', () => {
      const source = new SpyIterable(numberGenerator());
      const q = query(source);
      const result = [];

      expect(source.wasIterated).to.be.false;

      q.take(4).forEach((elem, idx) => result.push(elem + 10));

      expect(result).to.be.deep.equal([10, 11, 12, 13]);
    });

    it('Should return 3 transformed elements', () => {
      const q = query(numberGenerator(10, 10));
      const result = [];
      q.take(3).forEach((elem, idx) => result.push(elem + idx));
      expect(result).to.be.deep.equal([
        10, 21, 32,
      ]);
    });
  });
});
