const solve1 = require('./1');
const solve2 = require('./2');
const parse = require('./in');
const get = require('../input');
const input = parse(get('07'));
const sample = parse(get('07', true));

describe('07', () => {
  it('solve 1', () => {
    expect(solve1(sample)).toMatchInlineSnapshot(`"CABDFE"`);
    expect(solve1(input)).toMatchInlineSnapshot(`"GLMVWXZDKOUCEJRHFAPITSBQNY"`);
  });

  it('solve 2', () => {
    expect(solve2(sample)).toMatchInlineSnapshot(`253`);
    expect(solve2(input)).toMatchInlineSnapshot(`1105`);
  });
});
