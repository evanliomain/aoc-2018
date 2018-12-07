const T = require('taninsam');

const charToNumber = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26
};

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(s =>
        s.replace(
          /Step ([A-Z]) must be finished before step ([A-Z]) can begin./,
          '$1,$2'
        )
      )
    )
    .chain(T.map(T.split(',')))
    .chain(deps => {
      const byChildren = {};
      deps.forEach(([parent, child]) => {
        if (T.isUndefined(byChildren[parent])) {
          byChildren[parent] = [];
        }
        if (T.isUndefined(byChildren[child])) {
          byChildren[child] = [parent];
          return;
        }
        byChildren[child].push(parent);
      });
      return byChildren;
    })
    .chain(T.entries())
    .chain(
      T.map(([child, parents]) => [
        child,
        parents,
        60 + charToNumber[child],
        { running: false }
      ])
    )
    .value();
};
