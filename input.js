const fs = require('fs');

module.exports = function get(n, isSample) {
  return fs
    .readFileSync('./input/' + n + (isSample ? '.sample' : ''), 'utf8')
    .split('\n')
    .filter(x => '' !== x);
};
