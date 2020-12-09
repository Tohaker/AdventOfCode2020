import day9 from '.';

describe('Day 9', () => {
  it('should find the first invalid number', () => {
    const preamble = 5;
    const input = [
      35,
      20,
      15,
      25,
      47,
      40,
      62,
      55,
      65,
      95,
      102,
      117,
      150,
      182,
      127,
      219,
      299,
      277,
      309,
      576,
    ].map((v) => `${v}`);

    const result = day9.part1(input, preamble);
    expect(result).toBe(127);
  });

  it('should find the contiguous set adding up to value in part1', () => {
    const preamble = 5;
    const input = [
      35,
      20,
      15,
      25,
      47,
      40,
      62,
      55,
      65,
      95,
      102,
      117,
      150,
      182,
      127,
      219,
      299,
      277,
      309,
      576,
    ].map((v) => `${v}`);
    const result = day9.part2(input, preamble);
    expect(result).toBe(62);
  });
});
