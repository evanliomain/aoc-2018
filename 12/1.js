const T = require('taninsam');

module.exports = function({ initialState, rules }) {
  // console.log(
  //   T.chain(initialState)
  //     .chain(T.keys())
  //     .chain(T.map(x => parseInt(x, 10)))
  //     .chain(T.sortBy(x => x))
  //     .value()
  // );

  const nexter = nextGen(matchPattern(rules));
  let state = initialState;
  console.log(0, joinPots(state), sum(state));
  for (let i = 1; i <= 20; i++) {
    state = nexter(state);
    console.log(i, joinPots(state), sum(state));
  }
  // console.log(joinPots(state));

  return sum(state);
};

function getFirst(pots) {
  return T.chain(pots)
    .chain(T.keys())
    .chain(T.map(x => parseInt(x, 10)))
    .chain(T.sortBy(x => x))
    .chain(T.head())
    .value();
}
function getLast(pots) {
  return T.chain(pots)
    .chain(T.keys())
    .chain(T.map(x => parseInt(x, 10)))
    .chain(T.sortBy(x => x))
    .chain(T.last())
    .value();
}

function joinPots(pots) {
  let res = '';
  const first = getFirst(pots);
  const last = getLast(pots);

  for (let current = first; current <= last; current++) {
    res += pots[current];
  }
  return res;
}

function nextGen(matcher) {
  return pots => {
    const nextPots = {};
    const first = getFirst(pots);
    const last = getLast(pots);

    const ffirstState = matcher('....' + pots[first]);
    if ('#' === ffirstState) {
      nextPots[first - 2] = ffirstState;
    }

    const firstState = matcher('...' + pots[first] + pots[first + 1]);
    if ('#' === firstState) {
      nextPots[first - 1] = firstState;
    }

    const lastState = matcher(pots[last - 1] + pots[last] + '...');
    if ('#' === lastState) {
      nextPots[last + 1] = lastState;
    }
    const flastState = matcher(pots[last] + '....');
    if ('#' === flastState) {
      if (undefined === nextPots[last + 1]) {
        nextPots[last + 1] = '.';
      }
      nextPots[last + 2] = flastState;
    }

    for (let current = first; current <= last; current++) {
      let cur = pots[current];
      let previous = pots[current - 1];
      let pprevious = pots[current - 2];
      let next = pots[current + 1];
      let nnext = pots[current + 2];

      if (first === current) {
        previous = '.';
        pprevious = '.';
      }
      if (first === current - 1) {
        pprevious = '.';
      }
      if (last === current) {
        next = '.';
        nnext = '.';
      }
      if (last === current + 1) {
        nnext = '.';
      }
      nextPots[current] = matcher(pprevious + previous + cur + next + nnext);
    }

    return nextPots;
  };
}

function matchPattern(rules) {
  return pattern => {
    const fi = rules.find(rule => pattern === rule.pattern);
    if (undefined === fi) {
      return '.';
    }
    const { nextState } = fi;
    return nextState;
  };
}

function sum(pots) {
  let res = 0;
  const first = getFirst(pots);
  const last = getLast(pots);
  for (let current = first; current <= last; current++) {
    if ('#' === pots[current]) {
      res += current;
    }
  }
  return res;
}
