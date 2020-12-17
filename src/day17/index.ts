const parseInput = (input: string[]) => input.map((v) => Array.from(v));

const createBlankGrid = (size: number) => {
  const grid = Array(size);
  for (let i = 0; i < size; i++) {
    grid[i] = Array(size).fill('');
  }
  return grid;
};

const nextCubeState = (state: string, adjacent: string[]) => {
  const active = adjacent.reduce((acc, curr) => acc + Number(curr === '#'), 0);

  if (state === '#') {
    return active === 2 || active === 3 ? '#' : '.';
  } else {
    return active === 3 ? '#' : '.';
  }
};

const findNextState = (map: string[][][]) => {
  // Expanding the grid by one inactive cube in each dimension
  const size = map[0][0].length + 2;
  const expandedMap: string[][][] = [
    createBlankGrid(size),
    ...map.map((layer) => [
      Array(size).fill('.'),
      ...layer.map((line) => {
        line.unshift('.');
        line.push('.');
        return line;
      }),
      Array(size).fill('.'),
    ]),
    createBlankGrid(size),
  ];

  const newMap = expandedMap.map((z) => z.map((y) => y.map(() => '.')));

  expandedMap.forEach((z, k) => {
    z.forEach((y, j) => {
      y.forEach((x, i) => {
        // Own layer
        const rowAbove = z[j - 1];
        const rowBelow = z[j + 1];

        // Layer above
        const layerAbove = expandedMap[k - 1];
        const layerBelow = expandedMap[k + 1];

        const adjacent = [y[i + 1], y[i - 1]];

        if (rowAbove)
          adjacent.push(rowAbove[i], rowAbove[i + 1], rowAbove[i - 1]);

        if (rowBelow)
          adjacent.push(rowBelow[i], rowBelow[i + 1], rowBelow[i - 1]);

        if (layerAbove) {
          adjacent.push(
            layerAbove[j][i],
            layerAbove[j][i + 1],
            layerAbove[j][i - 1]
          );

          if (layerAbove[j - 1]) {
            adjacent.push(
              layerAbove[j - 1][i],
              layerAbove[j - 1][i + 1],
              layerAbove[j - 1][i - 1]
            );
          }

          if (layerAbove[j + 1]) {
            adjacent.push(
              layerAbove[j + 1][i],
              layerAbove[j + 1][i + 1],
              layerAbove[j + 1][i - 1]
            );
          }
        }

        if (layerBelow) {
          adjacent.push(
            layerBelow[j][i],
            layerBelow[j][i + 1],
            layerBelow[j][i - 1]
          );

          if (layerBelow[j - 1]) {
            adjacent.push(
              layerBelow[j - 1][i],
              layerBelow[j - 1][i + 1],
              layerBelow[j - 1][i - 1]
            );
          }

          if (layerBelow[j + 1]) {
            adjacent.push(
              layerBelow[j + 1][i],
              layerBelow[j + 1][i + 1],
              layerBelow[j + 1][i - 1]
            );
          }
        }

        newMap[k][j][i] = nextCubeState(x, adjacent.filter(Boolean));
      });
    });
  });

  return newMap;
};

const part1 = (input: string[]) => {
  let nextState = [parseInput(input)];

  for (let i = 0; i < 6; i++) {
    nextState = findNextState(nextState);
  }

  return nextState.flat(3).reduce((acc, curr) => acc + Number(curr === '#'), 0);
};

const part2 = (input: string[]) => {};

export default {
  part1,
  part2,
};
