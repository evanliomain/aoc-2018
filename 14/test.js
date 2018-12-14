const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('14'));
const sample = parse(get('14', true));

describe('14', () => {
  it('solve 1', () => {
    expect(solve1(9)).toEqual('5158916779');
    expect(solve1(5)).toEqual('0124515891');
    expect(solve1(18)).toEqual('9251071085');
    expect(solve1(2018)).toEqual('5941429882');
    // expect(solve1(input)).toMatchInlineSnapshot();
  });

  it('solve 2', () => {
    // expect(solve2(sample)).toMatchInlineSnapshot();
    // expect(solve2(input)).toMatchInlineSnapshot();
  });
});
