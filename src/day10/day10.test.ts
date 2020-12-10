import day10 from '.';

describe('Day 10', () => {
  it('should count differences in jolts', () => {
    const input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4].map((v) => `${v}`);
    const result = day10.part1(input);
    expect(result).toBe(35);

    const input2 = [
      28,
      33,
      18,
      42,
      31,
      14,
      46,
      20,
      48,
      47,
      24,
      23,
      49,
      45,
      19,
      38,
      39,
      11,
      1,
      32,
      25,
      35,
      8,
      17,
      7,
      9,
      4,
      2,
      34,
      10,
      3,
    ].map((v) => `${v}`);
    const result2 = day10.part1(input2);
    expect(result2).toBe(220);
  });

  it('should count all possible arrangements', () => {
    const input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4].map((v) => `${v}`);
    const result = day10.part2(input);
    expect(result).toBe(8);

    const input2 = [
      28,
      33,
      18,
      42,
      31,
      14,
      46,
      20,
      48,
      47,
      24,
      23,
      49,
      45,
      19,
      38,
      39,
      11,
      1,
      32,
      25,
      35,
      8,
      17,
      7,
      9,
      4,
      2,
      34,
      10,
      3,
    ].map((v) => `${v}`);
    const result2 = day10.part2(input2);
    expect(result2).toBe(19208);
  });
});
