const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(toCount))
    .chain(T.map(x => T.values()(x)))
    .chain(T.map(x => x.filter(value => 1 < value)))
    .chain(T.map(T.uniq()))
    .chain(
      T.reduce((acc, obj) => {
        T.chain(obj)
          .chain(
            T.map(value => {
              if (undefined === acc[value]) {
                acc[value] = 1;
              } else {
                acc[value] += 1;
              }
            })
          )
          .value();
        return acc;
      }, {})
    )
    .chain(T.entries())
    .chain(T.map(([key, value]) => value))
    .chain(T.reduce((a, b) => a * b, 1))
    .value();
};

function toCount(str) {
  const res = {};
  for (let i = 0; i < str.length; i++) {
    if (undefined === res[str[i]]) {
      res[str[i]] = 1;
    } else {
      res[str[i]] += 1;
    }
  }
  return res;
}
