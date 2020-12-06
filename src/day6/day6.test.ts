import day6 from '.';

describe('Day 6', () => {
  it('should count all unique answers and sum them', () => {
    const input = [
      'abc',
      '',
      'a',
      'b',
      'c',
      '',
      'ab',
      'ac',
      '',
      'a',
      'a',
      'a',
      'a',
      '',
      'b',
    ];
    const result = day6.part1(input);
    expect(result).toBe(11);
  });

  it('should count all identical answers in a group and sum them', () => {
    const input = [
      'abc',
      '',
      'a',
      'b',
      'c',
      '',
      'ab',
      'ac',
      '',
      'a',
      'a',
      'a',
      'a',
      '',
      'b',
    ];
    const result = day6.part2(input);
    expect(result).toBe(6);
  });
});
