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

describe('16 Operators', () => {
  it('addi', () => {
    expect(addi(1, 2, 0)([1, 2, 3, 4])).toEqual([4, 2, 3, 4]);
    expect(addi(1, 2, 1)([1, 2, 3, 4])).toEqual([1, 4, 3, 4]);
    expect(addi(1, 2, 2)([1, 2, 3, 4])).toEqual([1, 2, 4, 4]);
    expect(addi(1, 2, 3)([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('addr', () => {
    expect(addr(1, 2, 0)([1, 2, 3, 4])).toEqual([5, 2, 3, 4]);
    expect(addr(1, 2, 1)([1, 2, 3, 4])).toEqual([1, 5, 3, 4]);
    expect(addr(1, 2, 2)([1, 2, 3, 4])).toEqual([1, 2, 5, 4]);
    expect(addr(1, 2, 3)([1, 2, 3, 4])).toEqual([1, 2, 3, 5]);
  });

  it('muli', () => {
    expect(muli(1, 3, 0)([1, 3, 3, 4])).toEqual([9, 3, 3, 4]);
    expect(muli(1, 3, 1)([1, 3, 3, 4])).toEqual([1, 9, 3, 4]);
    expect(muli(1, 3, 2)([1, 3, 3, 4])).toEqual([1, 3, 9, 4]);
    expect(muli(1, 3, 3)([1, 3, 3, 4])).toEqual([1, 3, 3, 9]);
  });

  it('mulr', () => {
    expect(mulr(1, 2, 0)([1, 2, 3, 4])).toEqual([6, 2, 3, 4]);
    expect(mulr(1, 2, 1)([1, 2, 3, 4])).toEqual([1, 6, 3, 4]);
    expect(mulr(1, 2, 2)([1, 2, 3, 4])).toEqual([1, 2, 6, 4]);
    expect(mulr(1, 2, 3)([1, 2, 3, 4])).toEqual([1, 2, 3, 6]);
  });

  it('setr', () => {
    expect(setr(1, 2, 0)([1, 2, 3, 4])).toEqual([2, 2, 3, 4]);
    expect(setr(1, 2, 1)([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(setr(1, 2, 2)([1, 2, 3, 4])).toEqual([1, 2, 2, 4]);
    expect(setr(1, 2, 3)([1, 2, 3, 4])).toEqual([1, 2, 3, 2]);
  });

  it('seti', () => {
    expect(seti(1, 2, 0)([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(seti(1, 2, 1)([1, 2, 3, 4])).toEqual([1, 1, 3, 4]);
    expect(seti(1, 2, 2)([1, 2, 3, 4])).toEqual([1, 2, 1, 4]);
    expect(seti(1, 2, 3)([1, 2, 3, 4])).toEqual([1, 2, 3, 1]);
  });

  it('gtir', () => {
    expect(gtir(1, 2, 0)([7, 2, 0, 4])).toEqual([1, 2, 0, 4]);
    expect(gtir(1, 2, 1)([7, 2, 1, 4])).toEqual([7, 0, 1, 4]);
    expect(gtir(1, 2, 2)([7, 2, 3, 4])).toEqual([7, 2, 0, 4]);
    expect(gtir(1, 2, 3)([7, 2, 3, 4])).toEqual([7, 2, 3, 0]);
  });

  it('gtri', () => {
    expect(gtri(1, 2, 0)([7, 0, 2, 4])).toEqual([0, 0, 2, 4]);
    expect(gtri(1, 2, 1)([7, 1, 2, 4])).toEqual([7, 0, 2, 4]);
    expect(gtri(1, 2, 2)([7, 2, 2, 4])).toEqual([7, 2, 0, 4]);
    expect(gtri(1, 2, 3)([7, 3, 2, 4])).toEqual([7, 3, 2, 1]);
  });

  it('gtrr', () => {
    expect(gtrr(1, 2, 0)([7, 0, 2, 4])).toEqual([0, 0, 2, 4]);
    expect(gtrr(1, 2, 1)([7, 1, 2, 4])).toEqual([7, 0, 2, 4]);
    expect(gtrr(1, 2, 2)([7, 2, 2, 4])).toEqual([7, 2, 0, 4]);
    expect(gtrr(1, 2, 3)([7, 3, 2, 4])).toEqual([7, 3, 2, 1]);
  });

  it('eqrr', () => {
    expect(eqrr(1, 2, 0)([7, 0, 0, 4])).toEqual([1, 0, 0, 4]);
    expect(eqrr(1, 2, 1)([7, 2, 1, 4])).toEqual([7, 0, 1, 4]);
    expect(eqrr(1, 2, 2)([7, 2, 3, 4])).toEqual([7, 2, 0, 4]);
    expect(eqrr(1, 2, 3)([7, 2, 3, 4])).toEqual([7, 2, 3, 0]);
  });

  it('eqir', () => {
    expect(eqir(1, 2, 0)([7, 0, 0, 4])).toEqual([0, 0, 0, 4]);
    expect(eqir(1, 2, 1)([7, 2, 1, 4])).toEqual([7, 1, 1, 4]);
    expect(eqir(1, 2, 2)([7, 2, 2, 4])).toEqual([7, 2, 0, 4]);
    expect(eqir(1, 2, 3)([7, 2, 3, 4])).toEqual([7, 2, 3, 0]);
  });

  it('eqri', () => {
    expect(eqri(1, 2, 0)([7, 0, 0, 4])).toEqual([0, 0, 0, 4]);
    expect(eqri(1, 2, 1)([7, 2, 1, 4])).toEqual([7, 1, 1, 4]);
    expect(eqri(1, 2, 2)([7, 3, 2, 4])).toEqual([7, 3, 0, 4]);
    expect(eqri(1, 2, 3)([7, 4, 3, 4])).toEqual([7, 4, 3, 0]);
  });

  it('borr', () => {
    expect(borr(1, 2, 0)([7, 5, 3, 4])).toEqual([7, 5, 3, 4]);
    expect(borr(1, 2, 1)([7, 5, 3, 4])).toEqual([7, 7, 3, 4]);
    expect(borr(1, 2, 2)([7, 5, 3, 4])).toEqual([7, 5, 7, 4]);
    expect(borr(1, 2, 3)([7, 5, 3, 4])).toEqual([7, 5, 3, 7]);
  });

  it('bori', () => {
    expect(bori(1, 2, 0)([7, 5, 3, 4])).toEqual([7, 5, 3, 4]);
    expect(bori(1, 2, 1)([7, 5, 3, 4])).toEqual([7, 7, 3, 4]);
    expect(bori(1, 2, 2)([7, 5, 3, 4])).toEqual([7, 5, 7, 4]);
    expect(bori(1, 2, 3)([7, 5, 3, 4])).toEqual([7, 5, 3, 7]);
  });

  it('banr', () => {
    expect(banr(1, 2, 0)([7, 5, 3, 4])).toEqual([1, 5, 3, 4]);
    expect(banr(1, 2, 1)([7, 5, 3, 4])).toEqual([7, 1, 3, 4]);
    expect(banr(1, 2, 2)([7, 5, 3, 4])).toEqual([7, 5, 1, 4]);
    expect(banr(1, 2, 3)([7, 5, 3, 4])).toEqual([7, 5, 3, 1]);
  });

  it('bani', () => {
    expect(bani(1, 2, 0)([7, 5, 3, 4])).toEqual([0, 5, 3, 4]);
    expect(bani(1, 2, 1)([7, 5, 3, 4])).toEqual([7, 0, 3, 4]);
    expect(bani(1, 2, 2)([7, 5, 3, 4])).toEqual([7, 5, 0, 4]);
    expect(bani(1, 2, 3)([7, 5, 3, 4])).toEqual([7, 5, 3, 0]);
  });
});
