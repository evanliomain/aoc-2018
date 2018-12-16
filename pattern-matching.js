module.exports = function patternMatching(...patterns) {
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
      if (match === input) {
        return rule(input);
      }
      i++;
    }
    return input;
  };
};
