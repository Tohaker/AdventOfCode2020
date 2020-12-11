import day11 from '.';

describe('Day 11', () => {
  it('should count empty seats after settling', () => {
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
});
