import day12 from '.';

describe('Day 12', () => {
  it('should find the manhatten distance at the end of movement', () => {
    const input = ['F10', 'N3', 'F7', 'R90', 'F11'];
    const result = day12.part1(input);
    expect(result).toBe(25);
  });

  it('should find the manhatten distance at the end of waypoint movement', () => {
    const input = ['F10', 'N3', 'F7', 'R90', 'F11'];
    const result = day12.part2(input);
    expect(result).toBe(286);
  });
});
