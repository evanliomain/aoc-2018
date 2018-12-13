const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('12'));
const sample = parse(get('12', true));

describe('12', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`325`);
    expect(solve1(input)).toMatchInlineSnapshot(`3230`);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`999999999374`);
    expect(solve2(input)).toMatchInlineSnapshot(`4400000000304`);
  });
});
