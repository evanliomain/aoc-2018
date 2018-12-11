const T = require('taninsam');
const { makeGrid, toGetter, getMaxSize, makeGridArray } = require('./utils');

module.exports = function(input) {
  return makeGridArray();
  return T.chain(input)
    .chain(makeGrid)
    .chain(toGetter)
    .chain(getMaxSize(3))
    .chain(({ x, y }) => `${x},${y}`)
    .value();
};
