const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('09'));
const sample = parse(get('09', true));

describe('09', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`146373`);
    expect(solve1(input)).toMatchInlineSnapshot(`398502`);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`1406506154`);
    expect(solve2(input)).toMatchInlineSnapshot(`3352920421`);
  });
});
