const fs = require('fs');
const T = require('taninsam');
const solve = require('./1');

let data = 'nbPlayers,nbMarbles,hightScore\n';

for (let nbPlayers = 1; nbPlayers < 3; nbPlayers++) {
  console.log(nbPlayers);

  for (let lastMarble = 1; lastMarble < 5000; lastMarble++) {
    data += `${nbPlayers},${lastMarble},${solve({ nbPlayers, lastMarble })}\n`;
  }
}

fs.writeFileSync('../output/09-3.csv', data);

const [header, ...dataD] = fs
  .readFileSync('../output/09-3.csv', 'utf8')
  .split('\n')
  .filter(x => '' !== x);

const res = T.chain(dataD)
  .chain(T.map(T.split(',')))
  .chain(
    T.map(([nbPlayers, nbMarbles, hightScore]) => ({
      p: nbPlayers,
      m: nbMarbles,
      h: hightScore
    }))
  )
  .chain(x => JSON.stringify(x))
  .value();

fs.writeFileSync('../output/09-3.json', res);
