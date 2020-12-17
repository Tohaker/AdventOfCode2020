const parseInput = (input: string[]) => input.map((v) => Array.from(v));

const createBlankGrid = (size: number) => {
  const grid = Array(size).fill('');

  for (let i = 0; i < size; i++) {
    grid[i] = Array(size).fill('');
  }

  return grid;
};

const createBlankDimension = (dimensions: number, size: number) => {
  const dims = Array(dimensions).fill([]);

  for (let i = 0; i < dimensions; i++) {
    dims[i] = createBlankGrid(size);
  }

  return dims;
};

const nextCubeState = (state: string, adjacent: string[]) => {
  const active = adjacent.reduce((acc, curr) => acc + Number(curr === '#'), 0);

  if (state === '#') {
    return active === 2 || active === 3 ? '#' : '.';
  } else {
    return active === 3 ? '#' : '.';
  }
};

const findLayerState = (i: number, j: number, layer?: string[][]) => {
  const result = [];
  if (layer) {
    result.push(layer[j][i], layer[j][i + 1], layer[j][i - 1]);

    if (layer[j - 1]) {
      result.push(layer[j - 1][i], layer[j - 1][i + 1], layer[j - 1][i - 1]);
    }

    if (layer[j + 1]) {
      result.push(layer[j + 1][i], layer[j + 1][i + 1], layer[j + 1][i - 1]);
    }
  }

  return result;
};

const findNextState = (map: string[][][][], dimensions = 3) => {
  // Expanding the grid by one inactive cube in each dimension
  const size = map[0][0][0].length + 2;
  const dimensionSize = map[0].length + 2;

  const expandedMap: string[][][][] = [
    createBlankDimension(dimensionSize, size),
    ...map.map((dimension) => [
      createBlankGrid(size),
      ...dimension.map((layer) => [
        Array(size).fill('.'),
        ...layer.map((line) => {
          line.unshift('.');
          line.push('.');
          return line;
        }),
        Array(size).fill('.'),
      ]),
      createBlankGrid(size),
    ]),
    createBlankDimension(dimensionSize, size),
  ];

  const newMap = expandedMap.map((w) =>
    w.map((z) => z.map((y) => y.map(() => '.')))
  );

  expandedMap.forEach((w, l) =>
    w.forEach((z, k) => {
      z.forEach((y, j) => {
        y.forEach((x, i) => {
          // Own layer
          const rowAbove = z[j - 1];
          const rowBelow = z[j + 1];

          // Layers around
          const layerAbove = w[k - 1];
          const layerBelow = w[k + 1];

          // Dimensions around
          const dimensionAbove = expandedMap[l - 1];
          const dimensionBelow = expandedMap[l + 1];

          let adjacent = [y[i + 1], y[i - 1]];

          if (rowAbove)
            adjacent.push(rowAbove[i], rowAbove[i + 1], rowAbove[i - 1]);

          if (rowBelow)
            adjacent.push(rowBelow[i], rowBelow[i + 1], rowBelow[i - 1]);

          adjacent = adjacent.concat(findLayerState(i, j, layerAbove));
          adjacent = adjacent.concat(findLayerState(i, j, layerBelow));

          if (dimensions > 3 && (dimensionAbove || dimensionBelow)) {
            const layers = [];

            if (dimensionAbove) {
              layers.push(
                dimensionAbove[k],
                dimensionAbove[k - 1],
                dimensionAbove[k + 1]
              );
            }

            if (dimensionBelow) {
              layers.push(
                dimensionBelow[k],
                dimensionBelow[k - 1],
                dimensionBelow[k + 1]
              );
            }

            layers.forEach((layer) => {
              adjacent = adjacent.concat(findLayerState(i, j, layer));
            });
          }

          newMap[l][k][j][i] = nextCubeState(x, adjacent.filter(Boolean));
        });
      });
    })
  );

  return newMap;
};

const part1 = (input: string[]) => {
  let nextState = [[parseInput(input)]];

  for (let i = 0; i < 6; i++) {
    nextState = findNextState(nextState);
  }

  return nextState.flat(4).reduce((acc, curr) => acc + Number(curr === '#'), 0);
};

const part2 = (input: string[]) => {
  let nextState = [[parseInput(input)]];

  for (let i = 0; i < 6; i++) {
    nextState = findNextState(nextState, 4);
  }

  return nextState.flat(4).reduce((acc, curr) => acc + Number(curr === '#'), 0);
};

export default {
  part1,
  part2,
};
