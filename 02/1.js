const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(toCount))
    .chain(T.map(T.values()))
    .chain(T.map(T.filter(value => 1 < value)))
    .chain(T.map(T.uniq()))
    .chain(
      T.reduce((acc, obj) => {
        obj.forEach(value => {
          if (undefined === acc[value]) {
            acc[value] = 1;
          } else {
            acc[value] += 1;
          }
        });
        return acc;
      }, {})
    )
    .chain(T.entries())
    .chain(T.map(([, value]) => value))
    .chain(T.reduce((a, b) => a * b, 1))
    .value();
};

function toCount(str) {
  return T.chain(str)
    .chain(T.split())
    .chain(
      T.reduce((res, c) => {
        if (undefined === res[c]) {
          res[c] = 1;
        } else {
          res[c] += 1;
        }
        return res;
      }, {})
    )
    .value();
}
