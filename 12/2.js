const T = require('taninsam');

// My recursive pattern
// 124 36 '#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#....#..##.#..##.#..##.#.......#.....#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#' 11216

// 125 =>37
// 125-124+36

module.exports = function(input) {
  initialState = T.chain(
    '#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#....#..##.#..##.#..##.#.......#.....#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#'
  )
    .chain(T.split())
    .chain(arr => {
      const obj = {};
      arr.forEach((state, i) => {
        obj[i] = state;
      });
      return obj;
    })
    .value();

  return sum(initialState, 50000000000);
};

function sum(pots, nbIter) {
  const addon = nbIter - 124 + 36;
  let res = 0;
  const first = getFirst(pots);
  const last = getLast(pots);
  for (let current = first; current <= last; current++) {
    if ('#' === pots[current]) {
      res += current + addon;
    }
  }
  return res;
}

function getFirst(pots) {
  return T.chain(pots)
    .chain(T.keys())
    .chain(T.map(x => parseInt(x, 10)))
    .chain(T.sortBy(x => x))
    .chain(T.head())
    .value();
}
function getLast(pots) {
  return T.chain(pots)
    .chain(T.keys())
    .chain(T.map(x => parseInt(x, 10)))
    .chain(T.sortBy(x => x))
    .chain(T.last())
    .value();
}
