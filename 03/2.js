const T = require('taninsam');

const factory = {};

module.exports = function(input) {
  const ids = T.chain(input)
    .chain(T.map(({ id }) => id))
    .value();

  T.chain(input)
    .chain(
      T.map(({ id, x1, y1, x2, y2, w, h }) => {
        for (let xi = x1; xi <= x2; xi++) {
          for (let yi = y1; yi <= y2; yi++) {
            if (undefined === factory[`${xi}-${yi}`]) {
              factory[`${xi}-${yi}`] = [id];
            } else {
              factory[`${xi}-${yi}`].push(id);
            }
          }
        }
        return 'r';
      })
    )
    .value();

  const badParts = T.chain(factory)
    .chain(T.values())
    .chain(T.filter(x => 2 <= x.length))
    .chain(
      T.reduce((acc, arr) => {
        for (let i = 0; i < arr.length; i++) {
          if (undefined === acc[arr[i]]) {
            acc[arr[i]] = true;
          }
        }
        return acc;
      }, {})
    )
    .chain(T.keys())
    .value();

  return T.chain(ids)
    .chain(
      T.reduce((acc, id) => (badParts.includes(id) ? acc : [...acc, id]), [])
    )
    .chain(x => x[0])
    .value();
};
