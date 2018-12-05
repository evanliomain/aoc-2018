const reaction = require('./reaction');

// input
// { c: 'a', n: 1 }[]

module.exports = function(input) {
  let i = 0;
  let end = input.length;

  while (0 !== end && 1 !== end && i < end - 1) {
    if (0 !== reaction(input[i], input[i + 1], i)) {
      i++;
      continue;
    }

    input.splice(i, 2);
    i = Math.max(0, i - 1);
    end = input.length;
  }

  return end;
};
