module.exports = function loopWhile(startElement, predicate, iteree) {
  return input => {
    let accumulator = startElement(input);
    while (predicate(accumulator)) {
      accumulator = iteree(accumulator);
    }
    return accumulator;
  };
};
