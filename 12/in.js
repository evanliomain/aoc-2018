const T = require('taninsam');

module.exports = function(input) {
  let [initialState, ...rules] = input;
  rules = T.chain(rules)
    .chain(T.map(T.split(' => ')))
    .chain(T.map(([pattern, nextState]) => ({ pattern, nextState })))
    .value();
  initialState = T.chain(initialState)
    .chain(s => s.replace(/^initial state: /, ''))
    .chain(T.split())
    .chain(arr => {
      const obj = {};
      arr.forEach((state, i) => {
        obj[i] = state;
      });
      return obj;
    })
    .value();
  return { initialState, rules };
};
