import day14 from '.';

describe('Day 14', () => {
  it('should sum all binary values in memory', () => {
    const input = [
      'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      'mem[8] = 11',
      'mem[7] = 101',
      'mem[8] = 0',
    ];
    const result = day14.part1(input);
    expect(result).toBe(165);
  });

  it('should sum all binary values with version 2 decoding', () => {
    const input = [
      'mask = 000000000000000000000000000000X1001X',
      'mem[42] = 100',
      'mask = 00000000000000000000000000000000X0XX',
      'mem[26] = 1',
    ];
    const result = day14.part2(input);
    expect(result).toBe(208);
  });
});
