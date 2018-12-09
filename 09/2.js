const T = require('taninsam');
const solve = require('./1');

module.exports = function({ nbPlayers, lastMarble }) {
  return solve({ nbPlayers, lastMarble: 100 * lastMarble });
};
