// Return first min items
module.exports = function minBy(f) {
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
};
