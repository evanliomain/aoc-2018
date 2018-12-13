const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('11'));
const sample = parse(get('11', true));

describe('11', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`"1,1"`);
    expect(solve1(input)).toMatchInlineSnapshot(`"19,41"`);
  });

  it('solve 2', () => {
    // expect(solve2(input)).toMatchInlineSnapshot();
  });
});
