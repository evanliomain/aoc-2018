const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('05'));
const sample = parse(get('05', true));

describe('05', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`10`);
    expect(solve1(input)).toMatchInlineSnapshot(`9238`);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`4`);
    expect(solve2(input)).toMatchInlineSnapshot(`4052`);
  });
});
