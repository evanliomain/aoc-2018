const T = require('taninsam');
const { makeGrid, toGetter, getMaxSize } = require('./utils');

module.exports = function(input) {
  const grid = toGetter(makeGrid(input));
  const values = [];
  for (let i = 1; i <= 300; i++) {
    const maxForSize = getMaxSize(i)(grid);
    const { x, y, size } = maxForSize;
    console.log(`${x},${y},${size}`);
    values.push(maxForSize);
  }
  return T.chain(values)
    .chain(T.maxBy(({ value }) => value))
    .chain(({ x, y, size }) => `${x},${y},${size}`)
    .value();
};
