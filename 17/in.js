const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split(', ')))
    .chain(
      T.map(([position, range]) => {
        const [positionCoord, positionValue] = position.split('=');
        const [rangeCoord, rangeValue] = range.split('=');
        const [rangeMin, rangeMax] = rangeValue.split('..');
        return {
          positionCoord,
          positionValue,
          rangeCoord,
          rangeMin,
          rangeMax
        };
      })
    )
    .chain(
      T.castTo({
        positionValue: parseInt,
        rangeMin: parseInt,
        rangeMax: parseInt
      })
    )
    .chain(
      T.map(
        ({ positionCoord, positionValue, rangeCoord, rangeMin, rangeMax }) => {
          const carte = [];
          for (let i = rangeMin; i <= rangeMax; i++) {
            const truc = {};
            truc[positionCoord] = positionValue;
            truc[rangeCoord] = i;
            carte.push(truc);
          }
          return carte;
        }
      )
    )
    .chain(T.flat())
    .chain(T.map(({ x, y }) => [`${x},${y}`, { x, y }]))
    .chain(
      T.reduce((acc, [key, coords]) => {
        if (undefined === acc[key]) {
          acc[key] = coords;
        }
        return acc;
      }, {})
    )
    .value();
};
