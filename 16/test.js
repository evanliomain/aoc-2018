const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('13'));

describe('13', () => {
  it('solve 1', () => {
    expect(solve1(input)).toBe(500);
  });

  it('solve 2', () => {});
});
