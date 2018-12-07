const fullReaction = require('./full-reaction');

// input
// { c: 'a', n: 1 }[]

module.exports = function(input) {
  let m = input.length;

  for (let i = 1; i < 27; i++) {
    const r = fullReaction(input.filter(n => n !== i && n !== i + 26));
    if (r < m) {
      m = r;
    }
  }

  return m;
};
