import day15 from '.';

describe('Day 15', () => {
  it.each([
    [['0', '3', '6'], 436],
    [['1', '3', '2'], 1],
    [['2', '1', '3'], 10],
    [['1', '2', '3'], 27],
    [['2', '3', '1'], 78],
    [['3', '2', '1'], 438],
    [['3', '1', '2'], 1836],
  ])('should find the 2020th number', (input, expected) => {
    expect(day15.part1(input)).toBe(expected);
  });

  it.each([
    [['0', '3', '6'], 175594],
    [['1', '3', '2'], 2578],
    [['2', '1', '3'], 3544142],
    [['1', '2', '3'], 261214],
    [['2', '3', '1'], 6895259],
    [['3', '2', '1'], 18],
    [['3', '1', '2'], 362],
  ])('should find the 30 millionth number', (input, expected) => {
    expect(day15.part2(input)).toBe(expected);
  });
});
