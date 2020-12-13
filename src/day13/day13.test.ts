import day13 from '.';

describe('Day 13', () => {
  it('should find earliest departing bus', () => {
    const input = ['939', '7,13,x,x,59,x,31,19'];
    const result = day13.part1(input);
    expect(result).toBe(295);
  });

  describe('given sequences of bus times', () => {
    it.each([
      [['0', '7,13,x,x,59,x,31,19'], 1068781],
      [['0', '17,x,13,19'], 3417],
      [['0', '67,7,59,61'], 754018],
      [['0', '67,x,7,59,61'], 779210],
      [['0', '67,7,x,59,61'], 1261476],
      [['0', '1789,37,47,1889'], 1202161486],
    ])('should find the earliest matching timestamp', (input, result) => {
      const output = day13.part2(input);
      expect(output).toBe(result);
    });
  });
});
