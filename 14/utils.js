const T = require('taninsam');

module.exports = { getNextStep };

function getNextStep(recipes, current1, current2) {
  recipes.push(...getNewRecipes(recipes, current1, current2));
  let { current1: ncurrent1, current2: ncurrent2 } = getNewCurrentRecipes(
    recipes,
    current1,
    current2
  );
  return {
    recipes,
    current1: ncurrent1,
    current2: ncurrent2
  };
}

function getNewRecipes(recipes, current1, current2) {
  return T.chain(recipes[current1] + recipes[current2])
    .chain(x => String(x))
    .chain(T.split())
    .chain(T.map(x => parseInt(x, 10)))
    .value();
}

function getNewCurrentRecipes(recipes, current1, current2) {
  return {
    current1: (current1 + 1 + recipes[current1]) % recipes.length,
    current2: (current2 + 1 + recipes[current2]) % recipes.length
  };
}
