const patternMatching = require('../pattern-matching');
module.exports = {
  addr,
  addi,
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
};

function addr(A, B, C) {
  return register => put(register, C)(register[A] + register[B]);
}
function addi(A, B, C) {
  return register => put(register, C)(register[A] + B);
}
function mulr(A, B, C) {
  return register => put(register, C)(register[A] * register[B]);
}
function muli(A, B, C) {
  return register => put(register, C)(register[A] * B);
}
function setr(A, B, C) {
  return register => put(register, C)(register[A]);
}
function seti(A, B, C) {
  return register => put(register, C)(A);
}
function gtir(A, B, C) {
  return register => put(register, C)(booleanToInt(register[B] < A));
}
function gtri(A, B, C) {
  return register => put(register, C)(booleanToInt(B < register[A]));
}
function gtrr(A, B, C) {
  return register => put(register, C)(booleanToInt(register[B] < register[A]));
}
function eqrr(A, B, C) {
  return register =>
    put(register, C)(booleanToInt(register[A] === register[B]));
}
function eqir(A, B, C) {
  return register => put(register, C)(booleanToInt(A === register[B]));
}
function eqri(A, B, C) {
  return register => put(register, C)(booleanToInt(register[A] === B));
}
function borr(A, B, C) {
  return register => put(register, C)(register[A] | register[B]);
}
function bori(A, B, C) {
  return register => put(register, C)(register[A] | B);
}
function banr(A, B, C) {
  return register => put(register, C)(register[A] & register[B]);
}
function bani(A, B, C) {
  return register => put(register, C)(register[A] & B);
}

function put(register, C) {
  return value =>
    patternMatching(
      [0, () => [value, register[1], register[2], register[3]]],
      [1, () => [register[0], value, register[2], register[3]]],
      [2, () => [register[0], register[1], value, register[3]]],
      [3, () => [register[0], register[1], register[2], value]],
      [() => register]
    )(C);
}
function booleanToInt(bool) {
  return bool ? 1 : 0;
}
