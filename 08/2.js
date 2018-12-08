const T = require('taninsam');

module.exports = function(input) {
  const { tree } = recTruc({ tail: input.slice(), tree: [] });
  return tree[0].value;
};

function recTruc({ tail, tree }) {
  // Ending condition, no more food to eat
  if (0 === tail.length) {
    return { tail, tree };
  }

  if (0 === tree.length) {
    // My tree is empty, let's feed it
    const [nbChildren, nbMetadata, ...tail2] = tail;
    tree.push({ nbChildren, nbMetadata, children: [], value: 0, metadata: [] });

    return recTruc({ tail: tail2, tree });
  }

  const node = tree[0];
  if (0 === node.nbChildren) {
    // Extract node metadata
    for (let i = 0; i < node.nbMetadata; i++) {
      node.metadata.push(tail.shift());
    }
    node.value = T.sum()(node.metadata);
    return { tail, tree };
  }

  // Search all node children
  for (let i = 0; i < node.nbChildren; i++) {
    const { tail: newTail, tree: child } = recTruc({ tail, tree: [] });
    node.children.push(child);
    tail = newTail;
  }
  // Extract node metadata
  for (let i = 0; i < node.nbMetadata; i++) {
    node.metadata.push(tail.shift());
  }
  // compute the node value
  node.value = node.metadata.reduce((tmpValue, meta) => {
    if (T.isUndefined(node.children[meta - 1])) {
      return tmpValue;
    }
    return tmpValue + node.children[meta - 1][0].value;
  }, 0);

  // and exit
  return { tail, tree };
}
