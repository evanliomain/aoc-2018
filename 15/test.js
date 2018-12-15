const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('15'));
const sample = parse(get('15', true));
const sample1 = parse(get('15', 1));
const sample2 = parse(get('15', 2));
const sample3 = parse(get('15', 3));
const sample4 = parse(get('15', 4));
const sample5 = parse(get('15', 5));

describe('15', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toEqual(27730);
    expect(solve1(sample1)).toEqual(36334);
    expect(solve1(sample2)).toEqual(39514);
    expect(solve1(sample3)).toEqual(27755);
    expect(solve1(sample4)).toEqual(28944);
    expect(solve1(sample5)).toEqual(18740);
    // expect(solve1(input)).toMatchInlineSnapshot(`"Carts crashes at 48,20"`);
  });

  it('solve 2', () => {
    // expect(solve2(sample)).toEqual();
    // expect(solve2(input)).toMatchInlineSnapshot(`"Last cart at 59,64"`);
  });
});
