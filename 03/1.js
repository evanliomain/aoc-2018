const T = require('taninsam');

const factory = {};

module.exports = function(input) {
  return T.chain(makeFactory(input))
    .chain(T.values())
    .chain(T.filter(x => 2 <= x))
    .chain(T.length())
    .value();
};

function makeFactory(input) {
  const factory = {};

  input.forEach(({ x1, y1, x2, y2 }) => {
    for (let xi = x1; xi <= x2; xi++) {
      for (let yi = y1; yi <= y2; yi++) {
        if (undefined === factory[`${xi}-${yi}`]) {
          factory[`${xi}-${yi}`] = 1;
        } else {
          factory[`${xi}-${yi}`] += 1;
        }
      }
    }
  });
  return factory;
}
