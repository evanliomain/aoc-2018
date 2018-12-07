const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(x => parseInt(x, 10)))
    .value();
};
