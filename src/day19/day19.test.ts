import day19 from '.';

describe('Day 19', () => {
  it('should find the number of messages that match rule 0', () => {
    const input = [
      '0: 4 1 5',
      '1: 2 3 | 3 2',
      '2: 4 4 | 5 5',
      '3: 4 5 | 5 4',
      '4: "a"',
      '5: "b"',
      '',
      'ababbb',
      'bababa',
      'abbbab',
      'aaabbb',
      'aaaabbb',
    ];
    const result = day19.part1(input);
    expect(result).toBe(2);
  });

  it('should find the number of messages after replacement', () => {
    const input = [
      '42: 9 14 | 10 1',
      '9: 14 27 | 1 26',
      '10: 23 14 | 28 1',
      '1: "a"',
      '11: 42 31',
      '5: 1 14 | 15 1',
      '19: 14 1 | 14 14',
      '12: 24 14 | 19 1',
      '16: 15 1 | 14 14',
      '31: 14 17 | 1 13',
      '6: 14 14 | 1 14',
      '2: 1 24 | 14 4',
      '0: 8 11',
      '13: 14 3 | 1 12',
      '15: 1 | 14',
      '17: 14 2 | 1 7',
      '23: 25 1 | 22 14',
      '28: 16 1',
      '4: 1 1',
      '20: 14 14 | 1 15',
      '3: 5 14 | 16 1',
      '27: 1 6 | 14 18',
      '14: "b"',
      '21: 14 1 | 1 14',
      '25: 1 1 | 1 14',
      '22: 14 14',
      '8: 42',
      '26: 14 22 | 1 20',
      '18: 15 15',
      '7: 14 5 | 1 21',
      '24: 14 1',
      '',
      'abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa',
      'bbabbbbaabaabba',
      'babbbbaabbbbbabbbbbbaabaaabaaa',
      'aaabbbbbbaaaabaababaabababbabaaabbababababaaa',
      'bbbbbbbaaaabbbbaaabbabaaa',
      'bbbababbbbaaaaaaaabbababaaababaabab',
      'ababaaaaaabaaab',
      'ababaaaaabbbaba',
      'baabbaaaabbaaaababbaababb',
      'abbbbabbbbaaaababbbbbbaaaababb',
      'aaaaabbaabaaaaababaa',
      'aaaabbaaaabbaaa',
      'aaaabbaabbaaaaaaabbbabbbaaabbaabaaa',
      'babaaabbbaaabaababbaabababaaab',
      'aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba',
    ];
    const result = day19.part2(input);
    expect(result).toBe(12);
  });
});