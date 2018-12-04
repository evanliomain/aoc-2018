const T = require('taninsam');

const factory = {};

module.exports = function(input) {
  T.chain(input)
    .chain(
      T.map(({ id, x1, y1, x2, y2, w, h }) => {
        for (let xi = x1; xi <= x2; xi++) {
          for (let yi = y1; yi <= y2; yi++) {
            if (undefined === factory[`${xi}-${yi}`]) {
              factory[`${xi}-${yi}`] = 1;
            } else {
              factory[`${xi}-${yi}`] += 1;
            }
          }
        }
        return 'r';
      })
    )
    .value();

  return T.chain(factory)
    .chain(T.values())
    .chain(T.filter(x => 2 <= x))
    .chain(x => x.length)
    .value();
};
