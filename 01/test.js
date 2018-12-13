const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('01'));

describe('01', () => {
  it('sum inputs', () => {
    expect(solve1(input)).toMatchInlineSnapshot(`484`);
  });

  it('find frequency appear twice', () => {
    // expect(solve2(input)).toMatchInlineSnapshot();
  });
});
