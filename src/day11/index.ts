export const parseInput = (input: string[]) => input.map((l) => Array.from(l));

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

type SeatView = {
  empty: number;
  occupied: number;
};

export const countVisibleSeats = (
  row: number,
  col: number,
  seatingPlan: string[][]
): SeatView => {
  let occupied = 0;
  let empty = 0;

  // Cartesian directions
  for (let u = row - 1; u >= 0; u--) {
    const tile = seatingPlan[u][col];
    if (tile === 'L') {
      empty++;
      break;
    } else if (tile === '#') {
      occupied++;
      break;
    }
  }

  for (let d = row + 1; d < seatingPlan.length; d++) {
    const tile = seatingPlan[d][col];
    if (tile === 'L') {
      empty++;
      break;
    } else if (tile === '#') {
      occupied++;
      break;
    }
  }

  for (let l = col - 1; l >= 0; l--) {
    const tile = seatingPlan[row][l];
    if (tile === 'L') {
      empty++;
      break;
    } else if (tile === '#') {
      occupied++;
      break;
    }
  }

  for (let r = col + 1; r < seatingPlan[row].length; r++) {
    const tile = seatingPlan[row][r];
    if (tile === 'L') {
      empty++;
      break;
    } else if (tile === '#') {
      occupied++;
      break;
    }
  }

  // Diagonal directions
  // Up-left and Up-right

  let left = col - 1;
  let right = col + 1;

  let leftDone = false;
  let rightDone = false;

  for (let u = row - 1; u >= 0; u--) {
    const leftTile = seatingPlan[u][left];
    const rightTile = seatingPlan[u][right];

    empty +=
      Number(!leftDone && leftTile === 'L') +
      Number(!rightDone && rightTile === 'L');
    occupied +=
      Number(!leftDone && leftTile === '#') +
      Number(!rightDone && rightTile === '#');

    if (leftTile !== '.') leftDone = true;
    if (rightTile !== '.') rightDone = true;

    if (leftDone && rightDone) break;

    left--;
    right++;
  }

  // Down-left and Down-right

  left = col - 1;
  right = col + 1;

  leftDone = false;
  rightDone = false;

  for (let d = row + 1; d < seatingPlan.length; d++) {
    const leftTile = seatingPlan[d][left];
    const rightTile = seatingPlan[d][right];

    empty +=
      Number(!leftDone && leftTile === 'L') +
      Number(!rightDone && rightTile === 'L');
    occupied +=
      Number(!leftDone && leftTile === '#') +
      Number(!rightDone && rightTile === '#');

    if (leftTile !== '.') leftDone = true;
    if (rightTile !== '.') rightDone = true;

    if (leftDone && rightDone) break;

    left--;
    right++;
  }

  return { empty, occupied };
};

const newSeatStatus = (current: string, view: SeatView) => {
  if (view.occupied >= 5 && current === '#') {
    return 'L';
  }
  if (view.occupied === 0 && current === 'L') {
    return '#';
  }

  return current;
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

const part2 = (input: string[]) => {
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
        const newValue = newSeatStatus(
          previousValue,
          countVisibleSeats(i, j, startingPlan)
        );

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

export default {
  part1,
  part2,
};
