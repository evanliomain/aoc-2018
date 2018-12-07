const T = require('taninsam');

NB_WORKERS = 5;

/**
 * @param input [child, parent[], duration, state][]
 */
module.exports = function(input) {
  let computes = input.slice();
  let workers = [];
  let seconds = -1;

  while (0 < computes.length) {
    // Decrement workers time
    workers = workers.map(worker => worker - 1).filter(worker => 0 < worker);
    // Decrement running tasks
    computes = computes.map(([child, parents, duration, state]) => {
      if (!state.running) {
        return [child, parents, duration, state];
      }
      return [child, parents, duration - 1, state];
    });

    const computesToRemove = computes.filter(
      ([, , duration]) => 0 === duration
    );
    computes = computes.filter(([, , duration]) => 0 !== duration);

    if (0 !== computesToRemove.length) {
      // Remove computed tasks from computes parent
      computesToRemove.forEach(([child]) => {
        computes = T.chain(computes)
          .chain(
            T.map(([childy, parents, duration, state]) => [
              childy,
              parents.filter(parent => parent !== child),
              duration,
              state
            ])
          )
          .value();
      });
    }
    // Workers are still busy
    if (NB_WORKERS === workers.length) {
      seconds++;
      continue;
    }

    const nbWorkersAvailable = NB_WORKERS - workers.length;
    const currentTasks = T.chain(computes)
      .chain(
        T.filter(
          ([_, parents, , state]) => 0 === parents.length && !state.running
        )
      )
      .chain(T.sortBy(([child]) => child))
      .chain(T.take(nbWorkersAvailable))
      .value();

    // Mark tasks running from the list
    currentTasks.forEach(([currentTaskName]) => {
      computes = T.chain(computes)
        .chain(
          T.map(([child, parents, duration, state]) => {
            if (child === currentTaskName) {
              return [child, parents, duration, { running: true }];
            }
            return [child, parents, duration, state];
          })
        )
        .value();
    });

    workers.push(...currentTasks.map(([, , d]) => d));
    seconds++;
  }

  // End remains tasks
  // Decrement workers time
  while (0 < workers.length) {
    workers => workers.map(worker => worker - 1).filter(worker => 0 < worker);
    seconds++;
  }

  return seconds;
};
