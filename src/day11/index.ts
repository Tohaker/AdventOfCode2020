type SeatView = {
  empty: number;
  occupied: number;
};

type CbProps = (
  previous: string,
  i: number,
  j: number,
  plan: string[][]
) => string;

const changeSeatOccupation = (
  row: number,
  col: number,
  seatingPlan: string[][]
) => {
  if (seatingPlan[row][col] === '.') return '.';

  const previousRow = seatingPlan[row - 1];
  const currentRow = seatingPlan[row];
  const nextRow = seatingPlan[row + 1];

  let adjacentSeats = [currentRow[col - 1], currentRow[col + 1]];

  if (previousRow)
    adjacentSeats = adjacentSeats.concat(
      previousRow.slice(col - 1 >= 0 ? col - 1 : 0, col + 2)
    );

  if (nextRow)
    adjacentSeats = adjacentSeats.concat(
      nextRow.slice(col - 1 >= 0 ? col - 1 : 0, col + 2)
    );

  const occupiedSeats = adjacentSeats.filter((s) => s === '#').length;

  if (occupiedSeats >= 4) return 'L';
  if (occupiedSeats === 0) return '#';

  return seatingPlan[row][col];
};

export const countVisibleSeats = (
  row: number,
  col: number,
  seatingPlan: string[][]
): SeatView => {
  let occupied = 0;
  let empty = 0;

  // Cartesian directions
  for (let left = col - 1; left >= 0; left--) {
    const tile = seatingPlan[row][left];
    if (tile === 'L') {
      empty++;
      break;
    } else if (tile === '#') {
      occupied++;
      break;
    }
  }

  for (let right = col + 1; right < seatingPlan[row].length; right++) {
    const tile = seatingPlan[row][right];
    if (tile === 'L') {
      empty++;
      break;
    } else if (tile === '#') {
      occupied++;
      break;
    }
  }

  // Diagonal and Vertical directions
  // Up, Up-left and Up-right

  let left = col - 1;
  let right = col + 1;
  let centre = col;

  let leftDone = false;
  let rightDone = false;
  let centreDone = false;

  for (let u = row - 1; u >= 0; u--) {
    const leftTile = seatingPlan[u][left];
    const rightTile = seatingPlan[u][right];
    const centreTile = seatingPlan[u][centre];

    empty +=
      Number(!leftDone && leftTile === 'L') +
      Number(!rightDone && rightTile === 'L') +
      Number(!centreDone && centreTile === 'L');
    occupied +=
      Number(!leftDone && leftTile === '#') +
      Number(!rightDone && rightTile === '#') +
      Number(!centreDone && centreTile === '#');

    if (leftTile !== '.') leftDone = true;
    if (rightTile !== '.') rightDone = true;
    if (centreTile !== '.') centreDone = true;

    if (leftDone && rightDone && centreDone) break;

    left--;
    right++;
  }

  // Down, Down-left and Down-right

  left = col - 1;
  right = col + 1;
  centre = col;

  leftDone = false;
  rightDone = false;
  centreDone = false;

  for (let d = row + 1; d < seatingPlan.length; d++) {
    const leftTile = seatingPlan[d][left];
    const rightTile = seatingPlan[d][right];
    const centreTile = seatingPlan[d][centre];

    empty +=
      Number(!leftDone && leftTile === 'L') +
      Number(!rightDone && rightTile === 'L') +
      Number(!centreDone && centreTile === 'L');
    occupied +=
      Number(!leftDone && leftTile === '#') +
      Number(!rightDone && rightTile === '#') +
      Number(!centreDone && centreTile === '#');

    if (leftTile !== '.') leftDone = true;
    if (rightTile !== '.') rightDone = true;
    if (centreTile !== '.') centreDone = true;

    if (leftDone && rightDone && centreDone) break;

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

export const parseInput = (input: string[]) => input.map((l) => Array.from(l));

const createEmptyPlan = (rows: number, cols: number): string[][] => {
  const plan = Array(rows);
  for (let i = 0; i < rows; i++) {
    plan[i] = Array(cols).fill('');
  }
  return plan;
};

const findOccupiedSeats = (input: string[], newValueCb: CbProps) => {
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
        const newValue = newValueCb(previousValue, i, j, startingPlan);

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

const part1 = (input: string[]) =>
  findOccupiedSeats(input, (_, i, j, plan) => changeSeatOccupation(i, j, plan));

const part2 = (input: string[]) =>
  findOccupiedSeats(input, (prev, i, j, plan) =>
    newSeatStatus(prev, countVisibleSeats(i, j, plan))
  );

export default {
  part1,
  part2,
};
