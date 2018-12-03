const fs = require('fs');

module.exports = function get(n) {
  return fs
    .readFileSync('./input/' + n, 'utf8')
    .split('\n')
    .filter(x => '' !== x);
};
