const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('03'));
const sample = parse(get('03', true));

describe('03', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`4`);
    expect(solve1(input)).toMatchInlineSnapshot(`104241`);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`"3"`);
    expect(solve2(input)).toMatchInlineSnapshot(`"806"`);
  });
});
