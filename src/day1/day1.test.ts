import day1 from '.';

describe('Day 1', () => {
  it('should multiply two entries that sum to 2020', () => {
    const input = ['1721', '979', '366', '299', '675', '1456'];
    const result = day1.part1(input);
    expect(result).toBe(514579);
  });

  it('should multiply three entries that sum to 2020', () => {
    const input = ['1721', '979', '366', '299', '675', '1456'];
    const result = day1.part2(input);
    expect(result).toBe(241861950);
  });
});
