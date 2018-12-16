const T = require('taninsam');
const {
  addi,
  addr,
  mulr,
  muli,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqrr,
  eqir,
  eqri,
  borr,
  bori,
  banr,
  bani
} = require('./operators');

const operators = [
  addi,
  addr,
  mulr,
  muli,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqrr,
  eqir,
  eqri,
  borr,
  bori,
  banr,
  bani
];

module.exports = { operators, execute, matchSamples };

function execute(associations) {
  return program =>
    T.chain(program)
      .chain(
        T.reduce((register, [opcode, A, B, C]) =>
          operators[associations[opcode]](A, B, C)(register)
        )
      )
      .chain(T.head())
      .value();
}

function matchSamples(samples) {
  return associations =>
    T.chain(samples)
      .chain(
        T.every(
          ({ before, operation: [opcode, A, B, C], after }) =>
            T.hash()(after) ===
            T.hash()(operators[associations[opcode]](A, B, C)(before))
        )
      )
      .value();
}
