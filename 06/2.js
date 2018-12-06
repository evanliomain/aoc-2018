const T = require('taninsam');
const { distance } = require('./utils');

SAFE_DISTANCE = 10000;

module.exports = function({ carte, points }) {
  return T.chain(carte)
    .chain(T.values())
    .chain(
      T.map(point => ({
        ...point,
        d: T.chain(points)
          .chain(T.map(distance(point)))
          .chain(T.sumBy(x => x))
          .value()
      }))
    )
    .chain(T.filter(p => p.d < SAFE_DISTANCE))
    .chain(x => x.length)
    .value();
};
