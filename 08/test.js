const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('08'));
const sample = parse(get('08', true));

describe('08', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`138`);
    expect(solve1(input)).toMatchInlineSnapshot(`36891`);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`66`);
    expect(solve2(input)).toMatchInlineSnapshot(`20083`);
  });
});
