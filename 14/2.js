const T = require('taninsam');
const loopWhile = require('../loop-while');
const { getNextStep } = require('./utils');

const STEP = 10000;

module.exports = function(input) {
  const sinput = String(input);

  return T.chain({
    recipes: [3, 7],
    current1: 0,
    current2: 1
  })
    .chain(
      loopWhile(
        x => ({ ...x, match: -1, counter: 0, alreadySeen: 0 }),
        ({ match }) => -1 === match,
        ({ recipes, current1, current2, match, counter, alreadySeen }) => {
          const {
            recipes: nrecipes,
            current1: ncurrent1,
            current2: ncurrent2
          } = getNextStep({ recipes, current1, current2 });
          // Do not test recipes at each loop to gain performance
          if (STEP === counter) {
            match = nrecipes
              .slice(alreadySeen)
              .join('')
              .search(sinput);
            counter = 0;
            if (-1 === match) {
              alreadySeen = Math.max(0, nrecipes.length - sinput.length);
            }
          }
          counter++;
          return {
            recipes: nrecipes,
            current1: ncurrent1,
            current2: ncurrent2,
            match,
            counter,
            alreadySeen
          };
        }
      )
    )
    .chain(({ match, alreadySeen }) => match + alreadySeen)
    .value();
};
