import day25 from '.';

describe('Day 25', () => {
  const input = ['5764801', '17807724'];

  it('should determine the encryption key', () => {
    const result = day25.part1(input);
    expect(result).toBe(14897079);
  });
});
