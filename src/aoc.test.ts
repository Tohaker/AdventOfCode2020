import day1 from './day1';
import day2 from './day2';
import day3 from './day3';
import day4 from './day4';
import day5 from './day5';
import day6 from './day6';
import day7 from './day7';
import day8 from './day8';
import day9 from './day9';
import day10 from './day10';
import day11 from './day11';
import input from './inputs';

describe('Advent of Code 2020 Solutions', () => {
  it.each([
    [1, day1, 0, 713184, 261244452],
    [2, day2, 1, 622, 263],
    [3, day3, 2, 268, 3093068400],
    [4, day4, 3, 190, 121],
    [5, day5, 4, 855, 552],
    [6, day6, 5, 6530, 3323],
    [7, day7, 6, 348, 18885],
    [8, day8, 7, 1654, 833],
    [9, day9, 8, 1124361034, 129444555],
    [10, day10, 9, 2059, 86812553324672],
    [11, day11, 10, 2166, undefined],
  ])('should solve day %i', (_, day, index, part1, part2) => {
    expect(day.part1(input[index])).toBe(part1);
    expect(day.part2(input[index])).toBe(part2);
  });
});
