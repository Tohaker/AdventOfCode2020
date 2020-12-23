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
import day12 from './day12';
import day13 from './day13';
import day14 from './day14';
import day15 from './day15';
import day16 from './day16';
import input from './inputs';
import day17 from './day17';
import day18 from './day18';
import day19 from './day19';
import day20 from './day20';
import day21 from './day21';
import day22 from './day22';
import day23 from './day23';

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
    [11, day11, 10, 2166, 1955],
    [12, day12, 11, 757, 51249],
    [13, day13, 12, 2935, 836024966345345],
    [14, day14, 13, 8471403462063, 2667858637669],
    [15, day15, 14, 1618, 548531],
    [16, day16, 15, 29851, 3029180675981],
    [17, day17, 16, 348, 2236],
    [18, day18, 17, 45283905029161, 216975281211165],
    [19, day19, 18, 279, 384],
    [20, day20, 19, 17148689442341, 2009],
    [21, day21, 20, 2287, 'fntg,gtqfrp,xlvrggj,rlsr,xpbxbv,jtjtrd,fvjkp,zhszc'],
    [22, day22, 21, 32083, 35495],
    [23, day23, 22, '72496583', 41785843847],
  ])('should solve day %i', (_, day, index, part1, part2) => {
    expect(day.part1(input[index])).toBe(part1);
    expect(day.part2(input[index])).toBe(part2);
  });
});
