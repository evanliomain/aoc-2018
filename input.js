const T = require('taninsam');
const fs = require('fs');

module.exports = function get(n, isSample) {
  let suffix = '';
  if (isSample) {
    suffix = '.sample';
  }
  if (T.isNumber(isSample)) {
    suffix += isSample;
  }

  return fs
    .readFileSync('./input/' + n + suffix, 'utf8')
    .split('\n')
    .filter(x => '' !== x);
};
