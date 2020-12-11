const parseInput = (input: string[]) => input.map((l) => Array.from(l));

const changeSeatOccupation = (
  row: number,
  col: number,
  seatingPlan: string[][]
) => {
  if (seatingPlan[row][col] === '.') return '.';

  const previousRow = seatingPlan[row - 1];
  const currentRow = seatingPlan[row];
  const nextRow = seatingPlan[row + 1];

  const adjacentSeats = [];

  if (previousRow) {
    adjacentSeats.push(
      previousRow[col - 1],
      previousRow[col],
      previousRow[col + 1]
    );
  }

  adjacentSeats.push(currentRow[col - 1], currentRow[col + 1]);

  if (nextRow) {
    adjacentSeats.push(nextRow[col - 1], nextRow[col], nextRow[col + 1]);
  }

  const occupiedSeats = adjacentSeats.filter((s) => s === '#').length;

  if (occupiedSeats >= 4) return 'L';
  if (occupiedSeats === 0) return '#';

  return seatingPlan[row][col];
};

const createEmptyPlan = (rows: number, cols: number): string[][] => {
  const plan = Array(rows);
  for (let i = 0; i < rows; i++) {
    plan[i] = Array(cols).fill('');
  }
  return plan;
};

const part1 = (input: string[]) => {
  let startingPlan = parseInput(input);
  const rows = startingPlan.length;
  const cols = startingPlan[0].length;
  let changedSeats = 1;

  while (changedSeats > 0) {
    changedSeats = 0;
    const tempPlan = createEmptyPlan(rows, cols);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const previousValue = startingPlan[i][j];
        const newValue = changeSeatOccupation(i, j, startingPlan);

        tempPlan[i][j] = newValue;
        if (newValue !== previousValue) changedSeats++;
      }
    }

    // Make a deep copy
    startingPlan = JSON.parse(JSON.stringify(tempPlan));
  }

  return startingPlan.reduce(
    (count, row) =>
      count + row.reduce((c, col) => (col === '#' ? c + 1 : c), 0),
    0
  );
};

const part2 = (input: string[]) => {};

export default {
  part1,
  part2,
};
