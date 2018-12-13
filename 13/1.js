const T = require('taninsam');

module.exports = function({ circuit, carts }) {
  const next = tick(circuit);
  try {
    while (true) {
      carts = next(carts);
    }
  } catch (e) {
    return e.message;
  }
};

function printCircuit(circuit) {
  return T.chain(circuit)
    .chain(T.map(T.join('')))
    .chain(T.join('\n'))
    .chain(s => '\n' + s)
    .value();
}
function tick(circuit) {
  const move = moveCart(circuit);
  return inputCarts => {
    const carts = inputCarts.slice();
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
