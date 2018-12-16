const T = require('taninsam');
const chunk = require('../chunk');

module.exports = function(input) {
  return T.chain(input)
    .chain(array => ({
      samples: array.slice(0, 2472),
      program: array.slice(2472)
    }))
    .chain(({ samples, program }) => ({
      samples: T.chain(samples)
        .chain(
          T.map(s =>
            s.replace(/^Before: \[(\d), (\d), (\d), (\d)\]$/, '$1 $2 $3 $4')
          )
        )
        .chain(
          T.map(s =>
            s.replace(/^After:  \[(\d), (\d), (\d), (\d)\]$/, '$1 $2 $3 $4')
          )
        )
        .chain(T.map(T.split(' ')))
        .chain(T.map(T.map(s => parseInt(s, 10))))
        .chain(chunk(3))
        .chain(
          T.map(([before, operation, after]) => ({ before, operation, after }))
        )
        .value(),
      program: T.chain(program)
        .chain(T.map(T.split(' ')))
        .chain(T.map(T.map(s => parseInt(s, 10))))
        .value()
    }))
    .value();
};
