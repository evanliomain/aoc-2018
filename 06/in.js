const T = require('taninsam');
const { getCartePosition } = require('./utils');

module.exports = function(input) {
  const points = T.chain(input)
    .chain(T.map(s => s.split(',')))
    .chain(T.map(([x, y], id) => ({ x, y, id })))
    .chain(T.castTo({ x: parseInt, y: parseInt }))
    .chain(T.map(point => ({ ...point, isFinite: true })))
    .value();

  const X_MAX = T.chain(points)
    .chain(T.maxBy(p => p.x))
    .chain(p => p.x)
    .value();
  const Y_MAX = T.chain(points)
    .chain(T.maxBy(p => p.y))
    .chain(p => p.y)
    .value();

  const carte = {};
  for (let i = 0; i <= X_MAX; i++) {
    for (let j = 0; j <= Y_MAX; j++) {
      carte[getCartePosition({ x: i, y: j })] = { isTake: false, x: i, y: j };
    }
  }
  return { points, carte, X_MAX, Y_MAX };
};
