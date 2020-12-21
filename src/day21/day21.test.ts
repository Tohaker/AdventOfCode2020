import day21 from '.';

describe('Day 21', () => {
  const input = [
    'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
    'trh fvjkl sbzzf mxmxvkd (contains dairy)',
    'sqjhc fvjkl (contains soy)',
    'sqjhc mxmxvkd sbzzf (contains fish)',
  ];

  it('should count ingredients that do not have allergens', () => {
    const result = day21.part1(input);
    expect(result).toBe(5);
  });

  it('should list dangerous ingredients', () => {
    const result = day21.part2(input);
    expect(result).toBe('mxmxvkd,sqjhc,fvjkl');
  });
});
