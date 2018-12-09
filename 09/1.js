const T = require('taninsam');
const chalk = require('chalk');

module.exports = function({ nbPlayers, lastMarble }) {
  console.log(
    chalk.bold(nbPlayers),
    'players -',
    chalk.bold(lastMarble),
    'marbles'
  );

  const circleList = {
    0: {
      previous: 0,
      next: 0
    }
  };

  const players = T.fromEntries()(
    Array.from({ length: nbPlayers }, (_, k) => [k, 0])
  );
  let currentMarbles = 0;

  for (
    let marbleToPlay = 1, currentPlayer = 1;
    marbleToPlay <= lastMarble;
    marbleToPlay++, currentPlayer = (currentPlayer + 1) % nbPlayers
  ) {
    if (0 === marbleToPlay % 23) {
      // Search the marble to remove
      let marbleToRemove = currentMarbles;
      for (let i = 0; i < 7; i++) {
        marbleToRemove = circleList[marbleToRemove].previous;
      }
      // Link previous and next together
      circleList[circleList[marbleToRemove].previous].next =
        circleList[marbleToRemove].next;
      circleList[circleList[marbleToRemove].next].previous =
        circleList[marbleToRemove].previous;
      currentMarbles = circleList[marbleToRemove].next;

      // Credit player with the score
      players[currentPlayer] += marbleToPlay + marbleToRemove;
    } else {
      const previous = circleList[currentMarbles].next;
      const next = circleList[previous].next;
      circleList[marbleToPlay] = { previous, next };
      circleList[previous].next = marbleToPlay;
      circleList[next].previous = marbleToPlay;
      currentMarbles = marbleToPlay;
    }
  }
  return T.chain(players)
    .chain(T.values())
    .chain(T.max())
    .value();
};
