const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input[0])
    .chain(s =>
      s.replace(
        /([0-9]*) players; last marble is worth ([0-9]*) points/,
        '$1/$2'
      )
    )
    .chain(T.split('/'))
    .chain(([nbPlayers, lastMarble]) => ({ nbPlayers, lastMarble }))
    .value();
};
