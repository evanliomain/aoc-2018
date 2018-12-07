const T = require('taninsam');

module.exports = function(input) {
  const badParts = T.chain(makeFactory(input))
    .chain(T.values())
    .chain(T.filter(x => 2 <= x.length))
    .chain(
      T.reduce((acc, arr) => {
        arr.forEach(element => {
          if (undefined === acc[element]) {
            acc[element] = true;
          }
        });
        return acc;
      }, {})
    )
    .chain(T.keys())
    .value();

  return T.chain(input)
    .chain(T.map(({ id }) => id))
    .chain(
      T.reduce((acc, id) => (badParts.includes(id) ? acc : [...acc, id]), [])
    )
    .chain(T.head())
    .chain(x => x.substring(1))
    .value();
};

function makeFactory(input) {
  const factory = {};

  input.forEach(({ id, x1, y1, x2, y2, w, h }) => {
    for (let xi = x1; xi <= x2; xi++) {
      for (let yi = y1; yi <= y2; yi++) {
        if (undefined === factory[`${xi}-${yi}`]) {
          factory[`${xi}-${yi}`] = [id];
        } else {
          factory[`${xi}-${yi}`].push(id);
        }
      }
    }
  });
  return factory;
}
