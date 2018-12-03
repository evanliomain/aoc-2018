const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(x => parseInt(x, 10)))
    .chain(T.filter(x => !isNaN(x)))
    .chain(T.sumBy(x => x))
    .value();
};
