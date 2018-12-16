const T = require('taninsam');
const { operators } = require('./utils');

module.exports = function({ samples }) {
  return T.chain(samples)
    .chain(
      T.map(({ before, operation: [opcode, A, B, C], after }) => {
        const afterHash = T.hash()(after);
        return T.chain(operators)
          .chain(
            T.filter(
              operator => afterHash === T.hash()(operator(A, B, C)(before))
            )
          )
          .chain(T.length())
          .value();
      })
    )
    .chain(T.filter(n => 3 <= n))
    .chain(T.length())
    .value();
};
