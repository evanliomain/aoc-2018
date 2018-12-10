const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(s =>
        s.replace(
          /position=<\s*(-?\d*),\s*(-?\d*)> velocity=<\s*(-?\d*),\s*?(-?\d*)>/,
          '$1/$2/$3/$4'
        )
      )
    )
    .chain(T.map(T.split('/')))
    .chain(T.map(([x, y, vx, vy]) => ({ x, y, vx, vy })))
    .chain(T.castTo({ x: parseInt, y: parseInt, vx: parseInt, vy: parseInt }))
    .chain(T.map(({ x, y, vx, vy }) => [`${x}_${y}`, { x, y, vx, vy }]))
    .value();
};
