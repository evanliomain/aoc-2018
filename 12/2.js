const T = require('taninsam');
const { nextGen, joinPots, sum } = require('./utils');

const MAX_GENERATION = 50000000000;

module.exports = function({ initialState, rules }) {
  const next = nextGen(rules);
  let i = 0;
  let previousHash = joinPots(initialState);
  let currentHash;
  let state = initialState;
  // Compute the next generation, until we found the same pattern
  // We could so compute the sum for any generation next.
  // In my data, the pattern repeats but go to 1 plot to the right at each generation
  do {
    previousHash = currentHash;
    state = next(state);
    i++;
    currentHash = joinPots(state);
  } while (previousHash !== currentHash);

  return sum(MAX_GENERATION - i)(state);
};
