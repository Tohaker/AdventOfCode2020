import day18 from '.';

describe('Day 18', () => {
  it('should sum all expressions with + = *', () => {
    const input = [
      '1 + 2 * 3 + 4 * 5 + 6',
      '1 + (2 * 3) + (4 * (5 + 6))',
      '2 * 3 + (4 * 5)',
      '5 + (8 * 3 + 9 + 3 * 4 * 3)',
      '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
      '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
    ];
    const result = day18.part1(input);
    expect(result).toBe(26457);
  });

  it('should sum all expressions with * < +', () => {
    const input = [
      '1 + 2 * 3 + 4 * 5 + 6',
      '1 + (2 * 3) + (4 * (5 + 6))',
      '2 * 3 + (4 * 5)',
      '5 + (8 * 3 + 9 + 3 * 4 * 3)',
      '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
      '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
    ];
    const result = day18.part2(input);
    expect(result).toBe(694173);
  });
});
