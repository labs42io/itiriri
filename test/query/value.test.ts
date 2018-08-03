import { expect } from 'chai';
import { numbers as numberGenerator } from '../helpers/generators';
import { query } from '../../lib/Query';

describe('Query (value)', () => {
  describe('When calling at with positive index', () => {
    it('Should return first element', () => {
      const source = numberGenerator();
      const q = query(source);

      expect(q.nth(3)).to.be.equal(3);
    });
  });

  describe('When calling at with negative index', () => {
    it('Should return last element', () => {
      const source = numberGenerator();
      const q = query(source).take(100);

      expect(q.nth(-1)).to.be.equal(99);
    });
  });

  describe('When calling indexOf', () => {
    it('Should return first element index', () => {
      const source = numberGenerator(0, 3);
      const q = query(source);

      expect(q.indexOf(0)).to.be.equal(0);
    });

    it('Should return 5th element index', () => {
      const source = numberGenerator(0, 3);
      const q = query(source);

      expect(q.indexOf(12)).to.be.equal(4);
    });

    it('Should return 2nd element index', () => {
      const source = [2, 2, 2, 3, 4];
      const q = query(source);

      expect(q.indexOf(2, 1)).to.be.equal(1);
    });
  });

  describe('When calling lastIndexOf', () => {
    it('Should return first element index', () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.lastIndexOf(1)).to.be.equal(0);
    });

    it('Should return last element index', () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.lastIndexOf(4)).to.be.equal(5);
    });

    it('Should return 5th element index', () => {
      const source = [0, 1, 0, 0, 0, 2, 2, 2];
      const q = query(source);

      expect(q.lastIndexOf(0)).to.be.equal(4);
    });

    it('Should retrun -1', () => {
      const source = [1, 1, 2, 3, 4, 1, 4];
      const q = query(source);

      expect(q.lastIndexOf(2, 3)).to.be.equal(-1);
    });
  });

  describe('When calling findIndex', () => {
    it('Should return first element index', () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.findIndex(x => x === 1)).to.be.equal(0);
    });

    it('Should return last element index', () => {
      const source = [0, 1, 1, 1, 2, 44];
      const q = query(source);

      expect(q.findIndex(x => x - 10 > 30)).to.be.equal(5);
    });

    it('Should return 5th element index', () => {
      const source = [0, 1, 0, 0, -1, 2, 2, 2];
      const q = query(source);

      expect(q.findIndex(x => x < 0)).to.be.equal(4);
    });

    it('Should return -1', () => {
      const source = [0, 1, 0, 0, 1, 2, 2, 2];
      const q = query(source);

      expect(q.findIndex(x => x < 0)).to.be.equal(-1);
    });
  });

  describe('When calling findLastIndex', () => {
    it('Should return first element index', () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.findLastIndex(x => x === 1)).to.be.equal(0);
    });

    it('Should return last element index', () => {
      const source = [100, 1, 1, 1, 2, 44];
      const q = query(source);

      expect(q.findLastIndex(x => x - 10 > 30)).to.be.equal(5);
    });

    it('Should return 5th element index', () => {
      const source = [0, 1, 0, 0, -1, 2, 2, 2];
      const q = query(source);

      expect(q.findLastIndex(x => x < 0)).to.be.equal(4);
    });

    it('Should return -1', () => {
      const source = [0, 1, 0, 0, 1, 2, 2, 2];
      const q = query(source);

      expect(q.findLastIndex(x => x < 0)).to.be.equal(-1);
    });
  });

  describe('When calling count', () => {
    it('Should return 6', () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.length()).to.be.equal(6);
    });

    it('Should return 1', () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.length(x => x > 10)).to.be.equal(1);
    });

    it('Should return 3', () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.length((elem, idx) => idx > 2)).to.be.equal(3);
    });
  });

  describe('When calling first', () => {
    it('Should return 6', () => {
      const source = [6, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.first()).to.be.equal(6);
    });

    it('Should return undefined', () => {
      const source = [];
      const q = query(source);

      expect(q.first()).to.be.undefined;
    });

    it('Should return 3', () => {
      const source = numberGenerator(3, 0);
      const q = query(source);

      expect(q.first()).to.be.equal(3);
    });
  });

  describe('When calling find', () => {
    it('Should return 33', () => {
      const source = [6, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.find(x => x > 30)).to.be.equal(33);
    });

    it('Should return undefined', () => {
      const source = [1, 2];
      const q = query(source);

      expect(q.find((elem, idx) => elem + idx === 0)).to.be.undefined;
    });

    it('Should return first element', () => {
      const source = numberGenerator(3, 3);
      const q = query(source).take(10);

      expect(q.find(x => x === 3)).to.be.equal(3);
    });

    it('Should return 33', () => {
      const source = numberGenerator(3, 3);
      const q = query(source);

      expect(q.find((elem, idx) => idx === 10)).to.be.equal(33);
    });
  });

  describe('When calling last', () => {
    it('Should return 4', () => {
      const source = [6, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.last()).to.be.equal(4);
    });

    it('Should return undefined', () => {
      const source = [];
      const q = query(source);

      expect(q.last()).to.be.undefined;
    });
  });

  describe('When calling findLast', () => {
    it('Should return 33', () => {
      const source = [6, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.findLast(x => x > 30)).to.be.equal(33);
    });

    it('Should return undefined', () => {
      const source = [1, 2];
      const q = query(source);

      expect(q.findLast((elem, idx) => elem + idx === 0)).to.be.undefined;
    });

    it('Should return first element', () => {
      const source = [3, 4, 5, 5];
      const q = query(source).take(10);

      expect(q.findLast(x => x === 3)).to.be.equal(3);
    });
  });

  describe('When calling average', () => {
    it('Should return 33', () => {
      const source = [66, 0, 33];
      const q = query(source);

      expect(q.average()).to.be.equal(33);
    });

    it('Should return undefined', () => {
      const source = [];
      const q = query(source);

      expect(q.average()).to.be.undefined;
    });

    it('Should return 10', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: 0, tag: 'c' },
      ];
      const q = query(source);

      expect(q.average(x => x.val)).to.be.equal(10);
    });
  });

  describe('When calling min', () => {
    it('Should return -1', () => {
      const source = [-1, 3, 4, 33, 2, 4];
      const q = query(source);

      expect(q.min()).to.be.equal(-1);
    });

    it('Should return undefined', () => {
      const source = [];
      const q = query(source);

      expect(q.min()).to.be.undefined;
    });

    it('Should return first element', () => {
      const source = [
        { val: -10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: 0, tag: 'c' },
      ];
      const q = query(source);

      expect(q.min((e1, e2) => e2.val - e1.val)).to.be.equal(source[0]);
    });
  });

  describe('When calling max', () => {
    it('Should return 30', () => {
      const source = [-1, 3, 4, 30, 2, 4];
      const q = query(source);

      expect(q.max()).to.be.equal(30);
    });

    it('Should return undefined', () => {
      const source = [];
      const q = query(source);

      expect(q.max()).to.be.undefined;
    });

    it('Should return first element', () => {
      const source = [
        { val: 1010, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: 0, tag: 'c' },
      ];
      const q = query(source);

      expect(q.max(x => x.val)).to.be.equal(1010);
    });
  });

  describe('When calling sum', () => {
    it('Should return 30', () => {
      const source = [0, -4, 4, 30, 10, -10];
      const q = query(source);

      expect(q.sum()).to.be.equal(30);
    });

    it('Should return undefined', () => {
      const source = [];
      const q = query(source);

      expect(q.sum()).to.be.undefined;
    });

    it('Should return 20', () => {
      const source = [
        { val: 0, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: 0, tag: 'c' },
      ];
      const q = query(source);

      expect(q.max(x => x.val)).to.be.equal(20);
    });
  });

  describe('When calling reduce', () => {
    it('Should return 0', () => {
      const source = [0, -4, 4, 30, 10, -10];
      const q = query(source);

      expect(q.reduce(() => 0, 0)).to.be.equal(0);
    });

    it('Should throw exception', () => {
      const source = [];
      const q = query(source);

      expect(() => q.reduce(() => 0)).to.throw(Error, 'Sequence contains no elements.');
    });

    it('Should return 20', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source);

      expect(q.reduce((x, e, idx) => x + e.val, 0)).to.be.equal(20);
    });

    it('Should return abc', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source);

      expect(q.reduce((x, e, idx) => x + e.tag, '')).to.be.equal('abc');
    });
  });

  describe('When calling reduceRight', () => {
    it('Should return 0', () => {
      const source = [0, -4, 4, 30, 10, -10];
      const q = query(source);

      expect(q.reduceRight(() => 0, 0)).to.be.equal(0);
    });

    it('Should throw exception', () => {
      const source = [];
      const q = query(source);

      expect(() => q.reduceRight(() => 0)).to.throw(Error, 'Sequence contains no elements.');
    });

    it('Should return 20', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source);

      expect(q.reduceRight((x, e, idx) => x + e.val, 0)).to.be.equal(20);
    });

    it('Should return cba', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = query(source);

      expect(q.reduceRight((x, e, idx) => x + e.tag, '')).to.be.equal('cba');
    });
  });

  describe('When calling forEach', () => {
    it('Should return 4 transfromed elements', () => {
      const source = numberGenerator();
      const result = [];
      query(source).take(4).forEach((elem, idx) => result.push(elem + 10));

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
