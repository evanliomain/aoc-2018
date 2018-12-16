module.exports = function patternMatchingBy(by, ...patterns) {
  return input => {
    let i = 0;
    let end = patterns.length;
    while (i < end) {
      const pattern = patterns[i];
      // Default rule
      if (1 == pattern.length) {
        return pattern[0](input);
      }
      const [match, rule] = pattern;
      if (match === by(input)) {
        return rule(input);
      }
      i++;
    }
    return input;
  };
};
