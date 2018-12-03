const T = require('taninsam');

// X_MAX = 1000;
// Y_MAX = 998;

const factory = {};

module.exports = function(input) {
  T.chain(input)
    .chain(
      T.map(({ id, x1, y1, x2, y2, w, h }) => {
        // console.log(x1, x2, y1, y2);
        for (let xi = x1; xi <= x2; xi++) {
          for (let yi = y1; yi <= y2; yi++) {
            if (undefined === factory[`${xi}-${yi}`]) {
              factory[`${xi}-${yi}`] = 1;
            } else {
              factory[`${xi}-${yi}`] += 1;
            }
          }
        }
        return 'r';
      })
    )
    .value();

  return T.chain(factory)
    .chain(T.values())
    .chain(T.filter(x => 2 <= x))
    .chain(x => x.length)
    .value();
};

// Return first max items
function maxBy(f) {
  return arr => {
    if (0 === arr.length) {
      return undefined;
    }
    if (1 === arr.length) {
      return arr[0];
    }
    const [head, ...tail] = arr;
    return tail.reduce(
      (acc, element) => (f(element) <= f(acc) ? acc : element),
      head
    );
  };
}

// Return first min items
function minBy(f) {
  return arr => {
    if (0 === arr.length) {
      return undefined;
    }
    if (1 === arr.length) {
      return arr[0];
    }
    const [head, ...tail] = arr;
    return tail.reduce(
      (acc, element) => (f(acc) <= f(element) ? acc : element),
      head
    );
  };
}
