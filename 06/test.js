const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('06'));
const sample = parse(get('06', true));

describe('06', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`17`);
    // expect(solve1(input)).toMatchInlineSnapshot();
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`90`);
    expect(solve2(input)).toMatchInlineSnapshot(`42250`);
  });
});
