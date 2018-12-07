const T = require('taninsam');

module.exports = function(in1) {
  return T.chain(in1)
    .chain(T.map(x => x.split(' ')))
    .chain(
      T.map(([id, , coord, size]) => {
        const [w, h] = size.split('x');
        const [x, y] = coord.split(',');
        return { id, x, y, w, h };
      })
    )
    .chain(T.castTo({ x: parseInt, y: parseInt, w: parseInt, h: parseInt }))
    .chain(
      T.map(({ id, x, y, w, h }) => ({
        id,
        x1: x,
        y1: y,
        x2: x + w - 1,
        y2: y + h - 1
      }))
    )
    .value();
};
