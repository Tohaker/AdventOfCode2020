import day17 from '.';

describe('Day 17', () => {
  it('should count active cubes after 6 cycles', () => {
    const input = ['.#.', '..#', '###'];
    const result = day17.part1(input);
    expect(result).toBe(112);
  });

  it('should count active cubes in 4 dimensions after 6 cycles', () => {
    const input = ['.#.', '..#', '###'];
    const result = day17.part2(input);
    expect(result).toBe(848);
  });
});
