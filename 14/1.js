const T = require('taninsam');
const { getNextStep } = require('./utils');

module.exports = function(input) {
  let recipes = [3, 7];
  let current1 = 0;
  let current2 = 1;

  while (recipes.length < input + 10) {
    const {
      recipes: nrecipes,
      current1: ncurrent1,
      current2: ncurrent2
    } = getNextStep(recipes, current1, current2);

    recipes = nrecipes;
    current1 = ncurrent1;
    current2 = ncurrent2;
  }
  return recipes.slice(input, input + 10).join('');
};
