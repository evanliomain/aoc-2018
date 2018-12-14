const { getNextStep } = require('./utils');

const STEP = 10000;

module.exports = function(input) {
  const sinput = String(input);
  let recipes = [3, 7];
  let current1 = 0;
  let current2 = 1;
  let match = -1;
  let counter = 0;
  let alreadySeen = 0;

  while (-1 === match) {
    const {
      recipes: nrecipes,
      current1: ncurrent1,
      current2: ncurrent2
    } = getNextStep(recipes, current1, current2);

    recipes = nrecipes;
    current1 = ncurrent1;
    current2 = ncurrent2;
    if (STEP === counter) {
      match = recipes
        .slice(alreadySeen)
        .join('')
        .search(sinput);
      counter = 0;
      if (-1 === match) {
        alreadySeen = Math.max(0, recipes.length - sinput.length);
      }
    }
    counter++;
  }

  return match + alreadySeen;
};
