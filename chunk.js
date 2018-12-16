module.exports = function chunk(size = 1) {
  return array => {
    const result = [];
    let counter = 0;
    let accu = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (i !== 0 && 0 === counter % size) {
        result.push(accu);
        accu = [];
      }
      accu.push(element);
      counter++;
    }
    result.push(accu);
    return result;
  };
};
