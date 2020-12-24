type Coordinate = {
  x: number;
  y: number;
};

const parseInput = (input: string[]) =>
  input.map((line) => line.match(/(se)|(e)|(ne)|(nw)|(w)|(sw)/gm));

const createStartingGrid = (size: number): string[][] =>
  Array(size)
    .fill([])
    .map(() => Array(size).fill('.'));

const findNextCoordinate = (
  { x, y }: Coordinate,
  direction: string
): Coordinate => {
  switch (direction) {
    case 'e':
      return { x: x + 1, y };
    case 'w':
      return { x: x - 1, y };
    case 'ne':
      if (y % 2 === 0) return { x, y: y - 1 };
      else return { x: x + 1, y: y - 1 };
    case 'nw':
      if (y % 2 === 0) return { x: x - 1, y: y - 1 };
      else return { x, y: y - 1 };
    case 'se':
      if (y % 2 === 0) return { x, y: y + 1 };
      else return { x: x + 1, y: y + 1 };
    case 'sw':
      if (y % 2 === 0) return { x: x - 1, y: y + 1 };
      else return { x, y: y + 1 };
    default:
      return { x, y };
  }
};

const countAdjacentTiles = (grid: string[][], { x, y }: Coordinate) => {
  const surrounding = ['e', 'ne', 'nw', 'w', 'se', 'sw']
    .map((dir) => findNextCoordinate({ x, y }, dir))
    .filter(
      (coord) =>
        coord.y >= 0 &&
        coord.x >= 0 &&
        coord.y < grid.length &&
        coord.x < grid[0].length
    )
    .map((coord) => grid[coord.y][coord.x]);

  const black = surrounding.reduce((a, tile) => a + Number(tile === '#'), 0);
  const white = surrounding.length - black;

  return {
    white,
    black,
  };
};

const mapTiles = (input: string[]) => {
  const directions = parseInput(input);
  const startingSize = 1000;

  // Create a big grid and start in the dead centre.
  const grid = createStartingGrid(startingSize);
  const startX = startingSize / 2;
  const startY = startingSize / 2;

  directions.forEach((dir) => {
    let nextCoord = findNextCoordinate({ x: startX, y: startY }, dir![0]);
    dir!.slice(1).forEach((d) => {
      nextCoord = findNextCoordinate(nextCoord, d);
    });

    grid[nextCoord.y][nextCoord.x] =
      grid[nextCoord.y][nextCoord.x] === '#' ? '.' : '#'; // # represents a black tile, . represents a white tile.
  });

  return grid;
};

const countBlackTiles = (grid: string[][]) =>
  grid.reduce(
    (acc, row) => acc + row.reduce((a, tile) => a + Number(tile === '#'), 0),
    0
  );

const part1 = (input: string[]) => countBlackTiles(mapTiles(input));

const part2 = (input: string[]) => {
  let nextGrid = mapTiles(input);

  for (let i = 0; i < 100; i++) {
    nextGrid = nextGrid.map((row, y) =>
      row.map((tile, x) => {
        const { black } = countAdjacentTiles(nextGrid, { x, y });

        if (tile === '#') {
          if (black === 0 || black > 2) return '.';
          else return '#';
        } else {
          if (black === 2) return '#';
          else return '.';
        }
      })
    );
  }

  return countBlackTiles(nextGrid);
};

export default {
  part1,
  part2,
};
