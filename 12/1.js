const T = require('taninsam');
const fs = require('fs');

const MAX_GENERATION = 1000; //50000000000;

module.exports = function({ initialState, rules }) {
  const nexter = nextGen(matchPattern(rules));
  let state = initialState;
  console.log(0, joinPots(state), sum(state));
  let print = '';
  for (let i = 1; i <= MAX_GENERATION; i++) {
    state = nexter(state);
    print += joinPots(state) + '\n';
  }

  // fs.writeFileSync(`./output/12-${MAX_GENERATION}.txt`, print);

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
