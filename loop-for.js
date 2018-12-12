module.exports = function loopFor(iteree, startElement, start, stop, step = 1) {
  return () => {
    let accumulator = startElement;
    for (let i = start; i <= stop; i += step) {
      accumulator = iteree(accumulator, i);
    }
    return accumulator;
  };
};
