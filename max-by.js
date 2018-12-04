// Return first max items
module.exports = function maxBy(f) {
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
};
