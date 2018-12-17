const { makeMatrix, countFixWater, flowOfWater } = require('./utils');

module.exports = function(input) {
  return countFixWater(flowOfWater(makeMatrix(input)));
};
