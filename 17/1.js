const { makeMatrix, countWater, flowOfWater } = require('./utils');
module.exports = function(input) {
  return countWater(flowOfWater(makeMatrix(input)));
};
