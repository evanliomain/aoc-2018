const solve1 = require('./1');
const solve2 = require('./2');
const get = require('../input');
const input = get('02');

describe('02', () => {
  it('solve 1', () => {
    expect(solve1(input)).toMatchInlineSnapshot(`8610`);
  });

  it('solve 2', () => {
    expect(solve2(input)).toMatchInlineSnapshot(`"iosnxmfkpabcjpdywvrtahluy"`);
  });
});
