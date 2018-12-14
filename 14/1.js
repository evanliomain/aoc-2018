const T = require('taninsam');
const loopWhile = require('../loop-while');
const { getNextStep } = require('./utils');

module.exports = function(input) {
  return T.chain({
    recipes: [3, 7],
    current1: 0,
    current2: 1
  })
    .chain(
      loopWhile(
        x => x,
        ({ recipes }) => recipes.length < input + 10,
        getNextStep
      )
    )
    .chain(({ recipes }) => recipes.slice(input, input + 10))
    .chain(T.join(''))
    .value();
};
