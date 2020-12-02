import day2 from '.';

describe('Day 2', () => {
  it('should find 2 valid passwords', () => {
    const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];
    const result = day2.part1(input);

    expect(result).toBe(2);
  });

  it('should find 1 valid password', () => {
    const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];
    const result = day2.part2(input);

    expect(result).toBe(1);
  });
});
