const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');

describe('14', () => {
  it('solve 1', () => {
    expect(solve1(9)).toEqual('5158916779');
    expect(solve1(5)).toEqual('0124515891');
    expect(solve1(18)).toEqual('9251071085');
    expect(solve1(2018)).toEqual('5941429882');
  });

  it('solve 2', () => {
    expect(solve2('51589')).toEqual(9);
    expect(solve2('01245')).toEqual(5);
    expect(solve2('92510')).toEqual(18);
    expect(solve2('59414')).toEqual(2018);
  });
});
