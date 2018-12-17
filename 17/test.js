const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const sample = parse(get('17', true));

describe('17', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toBe(57);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toBe(29);
  });
});
