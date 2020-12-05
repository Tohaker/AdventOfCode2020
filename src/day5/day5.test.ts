import day5, { binarySearch } from '.';

describe('Day 5', () => {
  it.each([
    ['FBFBBFFRLR', { row: 44, col: 5 }],
    ['BFFFBBFRRR', { row: 70, col: 7 }],
    ['FFFBBBFRRR', { row: 14, col: 7 }],
    ['BBFFBBFRLL', { row: 102, col: 4 }],
  ])('should calculate seat for %s', (boardingPass, expected) => {
    expect(binarySearch(boardingPass)).toEqual(expected);
  });

  it('should find highest seat ID', () => {
    const input = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];
    const result = day5.part1(input);

    expect(result).toBe(820);
  });
});
