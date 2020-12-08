import day8 from '.';

describe('Day 8', () => {
  it('should find accumulator before first loop', () => {
    const input = [
      'nop +0',
      'acc +1',
      'jmp +4',
      'acc +3',
      'jmp -3',
      'acc -99',
      'acc +1',
      'jmp -4',
      'acc +6',
    ];

    const result = day8.part1(input);
    expect(result).toBe(5);
  });

  it('should fix the infinite loop', () => {
    const input = [
      'nop +0',
      'acc +1',
      'jmp +4',
      'acc +3',
      'jmp -3',
      'acc -99',
      'acc +1',
      'jmp -4',
      'acc +6',
    ];

    const result = day8.part2(input);
    expect(result).toBe(8);
  });
});
