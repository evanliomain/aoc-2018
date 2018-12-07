const T = require('taninsam');

/**
 * @param input [child, parent[]][]
 */
module.exports = function(input) {
  let computes = input.slice();
  const stack = [];

  while (0 < computes.length) {
    const currentTask = T.chain(computes)
      .chain(T.filter(([, parents]) => 0 === parents.length))
      .chain(T.map(([child]) => child))
      .chain(T.sort())
      .chain(T.head())
      .value();
    stack.push(currentTask);
    computes = computes
      .filter(([child]) => child !== currentTask)
      .map(([child, parents]) => [
        child,
        parents.filter(parent => parent !== currentTask)
      ]);
  }

  return stack.join('');
};
