import day20 from '.';

describe('Day 20', () => {
  const input = [
    'Tile 2311:',
    '..##.#..#.',
    '##..#.....',
    '#...##..#.',
    '####.#...#',
    '##.##.###.',
    '##...#.###',
    '.#.#.#..##',
    '..#....#..',
    '###...#.#.',
    '..###..###',
    '',
    'Tile 1951:',
    '#.##...##.',
    '#.####...#',
    '.....#..##',
    '#...######',
    '.##.#....#',
    '.###.#####',
    '###.##.##.',
    '.###....#.',
    '..#.#..#.#',
    '#...##.#..',
    '',
    'Tile 1171:',
    '####...##.',
    '#..##.#..#',
    '##.#..#.#.',
    '.###.####.',
    '..###.####',
    '.##....##.',
    '.#...####.',
    '#.##.####.',
    '####..#...',
    '.....##...',
    '',
    'Tile 1427:',
    '###.##.#..',
    '.#..#.##..',
    '.#.##.#..#',
    '#.#.#.##.#',
    '....#...##',
    '...##..##.',
    '...#.#####',
    '.#.####.#.',
    '..#..###.#',
    '..##.#..#.',
    '',
    'Tile 1489:',
    '##.#.#....',
    '..##...#..',
    '.##..##...',
    '..#...#...',
    '#####...#.',
    '#..#.#.#.#',
    '...#.#.#..',
    '##.#...##.',
    '..##.##.##',
    '###.##.#..',
    '',
    'Tile 2473:',
    '#....####.',
    '#..#.##...',
    '#.##..#...',
    '######.#.#',
    '.#...#.#.#',
    '.#########',
    '.###.#..#.',
    '########.#',
    '##...##.#.',
    '..###.#.#.',
    '',
    'Tile 2971:',
    '..#.#....#',
    '#...###...',
    '#.#.###...',
    '##.##..#..',
    '.#####..##',
    '.#..####.#',
    '#..#.#..#.',
    '..####.###',
    '..#.#.###.',
    '...#.#.#.#',
    '',
    'Tile 2729:',
    '...#.#.#.#',
    '####.#....',
    '..#.#.....',
    '....#..#.#',
    '.##..##.#.',
    '.#.####...',
    '####.#.#..',
    '##.####...',
    '##..#.##..',
    '#.##...##.',
    '',
    'Tile 3079:',
    '#.#.#####.',
    '.#..######',
    '..#.......',
    '######....',
    '####.#..#.',
    '.#...#.##.',
    '#.#####.##',
    '..#.###...',
    '..#.......',
    '..#.###...',
  ];
  it('should find corner tile IDs', () => {
    const result = day20.part1(input);
    expect(result).toBe(20899048083289);
  });

  it('should find all water that is not a sea monster', () => {
    const result = day20.part2(input);
    expect(result).toBe(273);
  });
});
