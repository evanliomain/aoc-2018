const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('13'));
const sample = parse(get('13', true));

describe('13', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`"Carts crashes at 2,0"`);
    expect(solve1(input)).toMatchInlineSnapshot(`"Carts crashes at 48,20"`);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`"Last cart at 6,4"`);
    expect(solve2(input)).toMatchInlineSnapshot(`"Last cart at 59,64"`);
  });
});
