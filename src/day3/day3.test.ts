import day3 from '.';

describe('Day 3', () => {
  it('should count number of trees in the way', () => {
    const input = [
      '..##.......',
      '#...#...#..',
      '.#....#..#.',
      '..#.#...#.#',
      '.#...##..#.',
      '..#.##.....',
      '.#.#.#....#',
      '.#........#',
      '#.##...#...',
      '#...##....#',
      '.#..#...#.#',
    ];
    const result = day3.part1(input);
    expect(result).toBe(7);
  });

  it('should calculate all routes', () => {
    const input = [
      '..##.......',
      '#...#...#..',
      '.#....#..#.',
      '..#.#...#.#',
      '.#...##..#.',
      '..#.##.....',
      '.#.#.#....#',
      '.#........#',
      '#.##...#...',
      '#...##....#',
      '.#..#...#.#',
    ];
    const result = day3.part2(input);
    expect(result).toBe(336);
  });
});
