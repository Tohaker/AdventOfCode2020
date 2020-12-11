import day11, { countVisibleSeats, parseInput } from '.';

describe('Day 11', () => {
  it('should count occupied seats after settling', () => {
    const input = [
      'L.LL.LL.LL',
      'LLLLLLL.LL',
      'L.L.L..L..',
      'LLLL.LL.LL',
      'L.LL.LL.LL',
      'L.LLLLL.LL',
      '..L.L.....',
      'LLLLLLLLLL',
      'L.LLLLLL.L',
      'L.LLLLL.LL',
    ];
    const result = day11.part1(input);
    expect(result).toBe(37);
  });

  it('should count occupied seats in all directions', () => {
    const input = [
      'L.LL.LL.LL',
      'LLLLLLL.LL',
      'L.L.L..L..',
      'LLLL.LL.LL',
      'L.LL.LL.LL',
      'L.LLLLL.LL',
      '..L.L.....',
      'LLLLLLLLLL',
      'L.LLLLLL.L',
      'L.LLLLL.LL',
    ];
    const result = day11.part2(input);
    expect(result).toBe(26);
  });

  describe('Counting Visible Seats', () => {
    it('should see all occupied seats', () => {
      const input = parseInput([
        '.......#.',
        '...#.....',
        '.#.......',
        '.........',
        '..#L....#',
        '....#....',
        '.........',
        '#........',
        '...#.....',
      ]);

      const count = countVisibleSeats(4, 3, input);
      expect(count.occupied).toBe(8);
      expect(count.empty).toBe(0);
    });

    it('should see one empty seat', () => {
      const input = parseInput([
        '.............',
        '.L.L.#.#.#.#.',
        '.............',
      ]);

      const count = countVisibleSeats(1, 1, input);
      expect(count.occupied).toBe(0);
      expect(count.empty).toBe(1);
    });

    it('should see no seats at all', () => {
      const input = parseInput([
        '.##.##.',
        '#.#.#.#',
        '##...##',
        '...L...',
        '##...##',
        '#.#.#.#',
        '.##.##.',
      ]);

      const count = countVisibleSeats(3, 3, input);
      expect(count.occupied).toBe(0);
      expect(count.empty).toBe(0);
    });
  });
});
