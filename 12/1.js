const T = require('taninsam');
const { nextGen, sum } = require('./utils');
const loopFor = require('../loop-for');

module.exports = function({ initialState, rules }) {
  return T.chain()
    .chain(loopFor(nextGen(rules), initialState, 1, 20))
    .chain(sum())
    .value();
};
