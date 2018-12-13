const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('04'));
const sample = parse(get('04', true));

describe('04', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`240`);
    expect(solve1(input)).toMatchInlineSnapshot(`30630`);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`4455`);
    expect(solve2(input)).toMatchInlineSnapshot(`136571`);
  });
});
