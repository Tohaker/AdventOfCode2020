import day22 from '.';

describe('Day 22', () => {
  const input = [
    'Player 1:',
    '9',
    '2',
    '6',
    '3',
    '1',
    '',
    'Player 2:',
    '5',
    '8',
    '4',
    '7',
    '10',
  ];

  it('should calculate the score at the end of the game', () => {
    const result = day22.part1(input);
    expect(result).toBe(306);
  });

  it('should calculate the score at the end of the recursive game', () => {
    const result = day22.part2(input);
    expect(result).toBe(291);
  });

  it('should activate the infinite game prevention rule', () => {
    const input = ['Player 1:', '43', '19', '', 'Player 2:', '2', '29', '14'];
    const result = day22.part2(input);
    expect(result).toBe(105);
  });
});
