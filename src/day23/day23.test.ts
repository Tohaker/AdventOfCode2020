import day23 from '.';

describe('Day 23', () => {
  const input = ['389125467'];

  it('should find the order of cups from 1 after 100 moves', () => {
    const result = day23.part1(input);
    expect(result).toBe('67384529');
  });

  it('should find the two cups next to 1 after 10m moves', () => {
    const result = day23.part2(input);
    expect(result).toBe(149245887792);
  });
});
