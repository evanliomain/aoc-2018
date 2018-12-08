const T = require('taninsam');

module.exports = function(input) {
  const { vrac } = recTruc({
    tail: input.slice(),
    lifo: [],
    vrac: []
  });
  return T.sum()(vrac);
};

function recTruc({ tail, lifo, vrac }) {
  // Ending condition, no more food to eat
  if (0 === tail.length) {
    return { tail, lifo, vrac };
  }

  if (0 === lifo.length) {
    // My lifo is empty, let's feed it
    const [nbChildren, nbMetadata, ...tail2] = tail;
    lifo.push({ nbChildren, nbMetadata });
    return recTruc({ tail: tail2, lifo, vrac });
  }

  const last = lifo.pop();

  if (0 !== last.nbChildren) {
    // It remains children on the node,
    lifo.push(last);
    const [nbChildren, nbMetadata, ...tail2] = tail;
    lifo.push({ nbChildren, nbMetadata });
    return recTruc({ tail: tail2, lifo, vrac });
  }

  // Extract node metadata
  for (let i = 0; i < last.nbMetadata; i++) {
    vrac.push(tail.shift());
  }

  // Decrement nb children of previous node
  if (0 !== lifo.length) {
    const prelast = lifo.pop();
    lifo.push({
      nbChildren: prelast.nbChildren - 1,
      nbMetadata: prelast.nbMetadata
    });
  }

  return recTruc({ tail, lifo, vrac });
}
