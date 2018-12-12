const T = require('taninsam');
module.exports = {
  nextGen,
  matchPattern,
  joinPots,
  sum
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

function nextGen(rules) {
  const matcher = matchPattern(rules);
  return pots => {
    const nextPots = {};
    const first = getFirst(pots);
    const last = getLast(pots);

    // Plots before the first full one could be filled
    const ffirstState = matcher('....' + pots[first]);
    if ('#' === ffirstState) {
      nextPots[first - 2] = ffirstState;
    }

    const firstState = matcher('...' + pots[first] + pots[first + 1]);
    if ('#' === firstState) {
      nextPots[first - 1] = firstState;
    }

    // Plots after the last full one could be filled
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
      const cur = pots[current];
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

    // Ellagage: need to improve perf significantly
    const newFirst = getFirst(nextPots);
    const newLast = getLast(nextPots);

    let current = newFirst;
    for (; current <= newLast; current++) {
      const cur = nextPots[current];
      if ('#' === cur) {
        break;
      }
    }
    for (let i = newFirst; i < current; i++) {
      delete nextPots[i];
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

function sum(addon = 0) {
  return pots => {
    let res = 0;
    const first = getFirst(pots);
    const last = getLast(pots);
    for (let current = first; current <= last; current++) {
      if ('#' === pots[current]) {
        res += current + addon;
      }
    }
    return res;
  };
}
