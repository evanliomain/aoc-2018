const T = require('taninsam');
module.exports = { tick, tick2 };

function printCircuit(circuit) {
  return T.chain(circuit)
    .chain(T.map(T.join('')))
    .chain(T.join('\n'))
    .chain(s => '\n' + s)
    .value();
}
function tick(circuit) {
  const move = moveCart(circuit);
  const rowLength = circuit[0].length;
  return inputCarts => {
    let carts = T.sortBy(({ x, y }) => x + y * rowLength)(inputCarts);
    const carCrash = {};
    for (let i = 0; i < carts.length; i++) {
      const cart = move(carts[i]);
      const coords = `${cart.x},${cart.y}`;
      if (undefined !== carCrash[coords]) {
        // A cart crash into another one
        throw new Error(`Carts crashes at ${coords}`);
      }
      carCrash[coords] = 1;
      carts[i] = cart;
    }
    return carts;
  };
}

function tick2(circuit) {
  const move = moveCart(circuit);
  const rowLength = circuit[0].length;
  return inputCarts => {
    // Sort cart by position to update them in the right order
    let carts = T.sortBy(({ x, y }) => x + y * rowLength)(inputCarts);
    const carCrash = {};
    carts.forEach((cart, i) => {
      const coords = `${cart.x},${cart.y}`;
      carCrash[coords] = i;
    });

    let hasCrash = false;
    for (let i = 0; i < carts.length; i++) {
      if ('TO_REMOVE' === carts[i]) {
        continue;
      }
      const previousCoords = `${carts[i].x},${carts[i].y}`;
      const cart = move(carts[i]);
      const coords = `${cart.x},${cart.y}`;
      if (undefined !== carCrash[coords]) {
        // A cart crash into another one
        // Lets mark them to remove
        carts[i] = 'TO_REMOVE';
        carts[carCrash[coords]] = 'TO_REMOVE';
        hasCrash = true;
        continue;
      }
      // Remove last position recorded
      delete carCrash[previousCoords];
      // And register the last
      carCrash[coords] = i;
      carts[i] = cart;
    }
    if (hasCrash) {
      // Garbage carts crashed
      carts = carts.filter(cart => 'TO_REMOVE' !== cart);
    }
    if (1 === carts.length) {
      // End when last cart standing
      throw new Error(`Last cart at ${carts[0].x},${carts[0].y}`);
    }

    return carts;
  };
}

function getCellFromCircuit(circuit) {
  return ({ x, y }) => circuit[y][x];
}

function moveCart(circuit) {
  const getCell = getCellFromCircuit(circuit);
  return cart => {
    const cell = getCell(cart);
    switch (`${cart.direction}${cell}`) {
      case '>-':
        return {
          ...cart,
          x: cart.x + 1
        };
      case '>\\':
        return {
          ...cart,
          direction: 'v',
          y: cart.y + 1
        };
      case '>/':
        return {
          ...cart,
          direction: '^',
          y: cart.y - 1
        };
      case '>+':
        if (0 === cart.counter % 3) {
          return {
            ...cart,
            direction: '^',
            y: cart.y - 1,
            counter: 1 + cart.counter
          };
        }
        if (1 === cart.counter % 3) {
          return {
            ...cart,
            x: cart.x + 1,
            counter: 1 + cart.counter
          };
        }
        if (2 === cart.counter % 3) {
          return {
            ...cart,
            direction: 'v',
            y: cart.y + 1,
            counter: 1 + cart.counter
          };
        }
        throw new Error('WTF >+');
      case '<-':
        return {
          ...cart,
          x: cart.x - 1
        };
      case '<\\':
        return {
          ...cart,
          direction: '^',
          y: cart.y - 1
        };
      case '</':
        return {
          ...cart,
          direction: 'v',
          y: cart.y + 1
        };
      case '<+':
        if (0 === cart.counter % 3) {
          return {
            ...cart,
            direction: 'v',
            y: cart.y + 1,
            counter: 1 + cart.counter
          };
        }
        if (1 === cart.counter % 3) {
          return {
            ...cart,
            x: cart.x - 1,
            counter: 1 + cart.counter
          };
        }
        if (2 === cart.counter % 3) {
          return {
            ...cart,
            direction: '^',
            y: cart.y - 1,
            counter: 1 + cart.counter
          };
        }
        throw new Error('WTF <+');
      case '^|':
        return {
          ...cart,
          y: cart.y - 1
        };
      case '^\\':
        return {
          ...cart,
          direction: '<',
          x: cart.x - 1
        };
      case '^/':
        return {
          ...cart,
          direction: '>',
          x: cart.x + 1
        };
      case '^+':
        if (0 === cart.counter % 3) {
          return {
            ...cart,
            direction: '<',
            x: cart.x - 1,
            counter: 1 + cart.counter
          };
        }
        if (1 === cart.counter % 3) {
          return {
            ...cart,
            y: cart.y - 1,
            counter: 1 + cart.counter
          };
        }
        if (2 === cart.counter % 3) {
          return {
            ...cart,
            direction: '>',
            x: cart.x + 1,
            counter: 1 + cart.counter
          };
        }
        throw new Error('WTF ^+');
      case 'v|':
        return {
          ...cart,
          y: cart.y + 1
        };
      case 'v\\':
        return {
          ...cart,
          direction: '>',
          x: cart.x + 1
        };
      case 'v/':
        return {
          ...cart,
          direction: '<',
          x: cart.x - 1
        };
      case 'v+':
        if (0 === cart.counter % 3) {
          return {
            ...cart,
            direction: '>',
            x: cart.x + 1,
            counter: 1 + cart.counter
          };
        }
        if (1 === cart.counter % 3) {
          return {
            ...cart,
            y: cart.y + 1,
            counter: 1 + cart.counter
          };
        }
        if (2 === cart.counter % 3) {
          return {
            ...cart,
            direction: '<',
            x: cart.x - 1,
            counter: 1 + cart.counter
          };
        }
        throw new Error('WTF v+');
    }
    throw new Error('WTF');
  };
}
